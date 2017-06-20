import set from 'lodash/fp/set';
import update from 'lodash/fp/update';
import isNull from 'lodash/fp/isNull';
import get from 'lodash/fp/get';
import unset from 'lodash/fp/unset';
import pipe from 'lodash/fp/pipe';
import {
  RECO_FETCH_REQUEST,
  RECO_FETCH_SUCCESS,
  RECO_FETCH_FAILURE
} from '../../actions/api/recommandations';

const stateKey = ['entities'];

export default (state = {entities: {}}, action) => {
  switch (action.type) {
    case RECO_FETCH_REQUEST: {
      const {meta} = action;
      const {id} = meta;
      return update(stateKey, reco => reco || null, state);
    }
    case RECO_FETCH_SUCCESS: {
      const {payload: {data}, meta} = action;
      // const {id} = meta;
      console.log('REDUXOR =============+>', meta, data);
      return set(stateKey, data, state);
    }
    case RECO_FETCH_FAILURE: {
      if (pipe(get(['recommendations']), isNull)(state)) 
        return unset(stateKey, state);
      return state;
    }
    default:
      return state;
  }
};
