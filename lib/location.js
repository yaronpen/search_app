import axios from 'axios';
import {
  LOCATION_API,
  LOCATION_KEY,
  CONST_HOOD,
  CONST_STATE,
  CONST_CITY,
  CONST_AGE,
  CONST_DIST,
  CONST_INCOME,
  CONST_PUBLIC_TRANSPORT,
  LATITUDE,
  LONGITUDE
} from './config.js';

export const getDistance = async (data, location_object) => {
  const address = location_object[0] ? location_object[0].value : undefined;
  const distance = location_object[0] ? location_object[0].distance : undefined;
  if (typeof address == 'undefined') {
    return data;
  }
  const response = await request(address);
  const geometry = response[0].geometry;

  const store = data.reduce((curr, item) => {
    const calculate_distance = getDistanceFromLatLonInKm(geometry.lat, geometry.lng, item.latitude, item.longitude);
    if(calculate_distance < distance) {
      const parsed_value = {
        'neigborhood': item[CONST_HOOD],
        'city': item[CONST_CITY],
        'state': item[CONST_STATE],
        'average age': item[CONST_AGE],
        'distance from city center': item[CONST_DIST],
        'average income': item[CONST_INCOME],
        'public transport availability': item[CONST_PUBLIC_TRANSPORT],
        'latitude': item[LATITUDE],
        'longitude': item[LONGITUDE],
        'distance_km': Math.floor(calculate_distance)
      };
      curr.push(parsed_value);
    }
    
    return curr;
  }, []);

  return store;
}

const request = async (address) => {
  const url = `https://${LOCATION_API}/json?q=${address}&key=${LOCATION_KEY}`
  const result = await axios.get(url)

  return result.data.results;
}

const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);  // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

const deg2rad = (deg) => {
  return deg * (Math.PI / 180)
}