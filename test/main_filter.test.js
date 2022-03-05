import { expect } from 'chai';
import { mainFilter } from '../lib/filter.js';
import { bigger_smaller_params, sort_params, location_params } from './testing_data.js'

const params = [
  bigger_smaller_params,
  sort_params,
  location_params
]

const pattern = {
  'neigborhood': String,
  'state': String,
  'city': String,
  'average age': String,
  'distance from city center': Number,
  'average income': Number,
  'public transport availability': String,
  'latitude': Number,
  'longitude': Number,
  'distance_km': Number
}

params.forEach(param => {
  describe(`testing main filter function for object`, () => {
    it('should return a json', () => {
      mainFilter(param).then(data => {
        expect(data).to.equal(object);
      });
    })
  })

  describe(`asserting schema results`, () => {
    it(`should return a certain schema`, () => {
      mainFilter(param).then(data => {
        expect(data).to.matchPattern(pattern);
      })
    })
  })

})

