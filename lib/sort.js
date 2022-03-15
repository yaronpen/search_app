import {
  CONST_HOOD,
  CONST_STATE,
  CONST_CITY,
  CONST_AGE,
  CONST_DIST,
  CONST_INCOME,
  CONST_PUBLIC_TRANSPORT,
  DISTANCE
} from './config.js'

export const sortFunction = (stored_final, sort_param) => {
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