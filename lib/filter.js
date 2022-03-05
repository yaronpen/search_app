import data from '../data.json';
import { getDistance } from './location.js';
import {
  CONST_HOOD,
  CONST_STATE,
  CONST_CITY,
  CONST_AGE,
  CONST_DIST,
  CONST_INCOME,
  CONST_PUBLIC_TRANSPORT,
  BIGGER,
  SMALLER,
  EQUAL,
  RANGE,
  CONST_SORT,
  ADDRESS,
  DISTANCE
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

// sort order util
const sortDictionary = (sort_field) => {
  const data = {
    hood: { key: CONST_HOOD },
    state: { key: CONST_STATE },
    city: { key: CONST_CITY },
    average_age: { key: CONST_AGE },
    dist_from_center: { key: CONST_DIST },
    avg_income: { key: CONST_INCOME },
    pub_transport_avail: { key: CONST_PUBLIC_TRANSPORT },
    distance_km: { key: DISTANCE }
  };

  return data[sort_field];
}

// sort function
const sortResult = (stored_final, sort_param) => {
  const sort_value = sort_param[0] ? sort_param[0].value : null;
    const direction = sort_param[0] ? sort_param[0].direction : null;
    if (sort_value) {
      const dictionary = sortDictionary(sort_value);
      const key = dictionary.key;
      return stored_final.sort((first, second) => {
        const first_param = first[key];
        const second_param = second[key];
        if (direction == 'desc') {
          return first_param < second_param ? 1 : -1;
        }
        return first_param > second_param ? 1 : -1;
      })
    }
    return stored_final;
}

const storeResultSet = (data, filtered_param) => {
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

export const mainFilter = async (params) => {
  try {
    const filtered_param = params.filter(item => typeof item.value != 'undefined' || typeof item.max != 'undefined' && typeof item.min != 'undefined');
    const stored_final = await storeResultSet(data, filtered_param)
    const locationParam = filtered_param.filter(item => item.key == ADDRESS);
    const result_set = await getDistance(stored_final, locationParam);
    const sort_param = filtered_param.filter(item => item.key == CONST_SORT);
    const results_sorted = sortResult(result_set, sort_param);

    return results_sorted;

  } catch (e) {
    throw new Error(`error in main filter function: ${e}`)
  }
}