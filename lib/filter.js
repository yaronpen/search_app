import {
  BIGGER,
  SMALLER,
  EQUAL,
  RANGE,
} from './config.js'

// filtering functions
const filterMore = (receveived_data, filters) => receveived_data.filter(item => !filters.find(x => x.key.split('.').reduce((keys, key) => keys[key], item) < x.value));
const filterLess = (receveived_data, filters) => receveived_data.filter(item => !filters.find(x => x.key.split('.').reduce((keys, key) => keys[key], item) > x.value));
const filterEqual = (receveived_data, filters) => receveived_data.filter(item => filters.find(x => x.key.split('.').reduce((keys, key) => keys[key], item) == x.value));
const filterRange = (receveived_data, filters) => {
  const max = filters.reduce((acc, item) => simplePush(acc, item.key, item.max), []);
  const min = filters.reduce((acc, item) => simplePush(acc, item.key, item.min), []);

  const semi = filterLess(receveived_data, max);
  const results = filterMore(semi, min);

  return results;
}

// formating data for the filters
const pushItem = (operator, acc, item) => {
  if (item.operator == operator) {
    acc.push({ key: item.key, value: item.value });
  }
  return acc;
}

const pushRange = (operator, acc, item) => {
  if (item.operator == operator) {
    acc.push({ key: item.key, min: item.min, max: item.max });
  }
  return acc;
}

const simplePush = (acc, key, value) => {
  acc.push({ key: key, value: value })
  return acc;
}

export const mainFilter = (data, filtered_param) => {
  return new Promise((resolve, reject) => {
    const bigger_params = filtered_param.reduce((acc, item) => pushItem(BIGGER, acc, item), []);
    const smaller_params = filtered_param.reduce((acc, item) => pushItem(SMALLER, acc, item), []);
    const equal_params = filtered_param.reduce((acc, item) => pushItem(EQUAL, acc, item), [])
    const range_params = filtered_param.reduce((acc, item) => pushRange(RANGE, acc, item), [])

    const stored = bigger_params.length > 0 ? filterMore(data, bigger_params) : data;
    const stored_first = smaller_params.length > 0 ? filterLess(stored, smaller_params) : stored;
    const stored_second = equal_params.length > 0 ? filterEqual(stored_first, equal_params) : stored_first;
    const stored_final = range_params.length > 0 ? filterRange(stored_second, range_params) : stored_second;
    resolve(stored_final)
  })
  
}
