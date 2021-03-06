import {combineReducers} from 'redux';
import {historyReducer} from '@coorpacademy/redux-history';
import counter from './counter';

const createReducers = () =>
  combineReducers({
    counter,
    route: historyReducer
  });

export default createReducers;
