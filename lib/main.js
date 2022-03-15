import data from '../data.json';
import { mainFilter } from './filter.js';
import { getDistance } from './location.js';
import { sortFunction } from './sort.js';
import {
  CONST_SORT,
  ADDRESS
} from './config.js'

export const main = async (params) => {
  try {
    const filtered_param = params.filter(item => typeof item.value != 'undefined' || typeof item.max != 'undefined' && typeof item.min != 'undefined');
    const stored_final = await mainFilter(data, filtered_param)
    const locationParam = filtered_param.filter(item => item.key == ADDRESS);
    const result_set = await getDistance(stored_final, locationParam);
    const sort_param = filtered_param.filter(item => item.key == CONST_SORT);
    const results_sorted = sortFunction(result_set, sort_param);

    return results_sorted;

  } catch (e) {
    throw new Error(`error in main filter function: ${e}`)
  }
}