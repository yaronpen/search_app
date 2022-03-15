import { main } from './main.js';
import {
  CONST_HOOD,
  CONST_STATE,
  CONST_CITY,
  CONST_AGE,
  CONST_DIST,
  CONST_INCOME,
  CONST_PUBLIC_TRANSPORT,
  EQUAL,
  ADDRESS,
  CONST_SORT
} from './config.js';

export const handler = async (req, res) => {
  const hood = { key: CONST_HOOD, value: req.query.hood, operator: EQUAL }
  const state = { key: CONST_STATE, value: req.query.state, operator: EQUAL };
  const city = { key: CONST_CITY, value: req.query.city, operator: EQUAL };

  const average_age = {
    key: CONST_AGE,
    value: req.query.average_age,
    operator: req.query.average_age_operator,
    min: req.query.average_age_min,
    max: req.query.average_age_max
  };

  const dist_from_center = {
    key: CONST_DIST,
    value: req.query.dist_from_center,
    operator: req.query.dist_from_center_op,
    min: req.query.dist_from_center_min,
    max: req.query.dist_from_center_max
  };

  const avg_income = {
    key: CONST_INCOME,
    value: req.query.avg_income,
    operator: req.query.avg_income_operator,
    min: req.query.avg_income_min,
    max: req.query.avg_income_max
  };

  const pub_transport_avail = {
    key: CONST_PUBLIC_TRANSPORT,
    value: req.query.pub_transport_avail,
    operator: EQUAL
  };
  const address = {
    key: ADDRESS,
    value: req.query.address,
    distance: req.query.distance
  }
  const sort = {
    key: CONST_SORT,
    value: req.query.sort_by,
    direction: req.query.sort_order
  };

  const params = [
    hood,
    state,
    city,
    average_age,
    avg_income,
    dist_from_center,
    pub_transport_avail,
    address,
    sort
  ];
  try {
    const stored = await main(params)
    res.send(stored);
  } catch (e) {
    console.log(`error: ${e}`)
    res.send(`error: server error`);
  }
}