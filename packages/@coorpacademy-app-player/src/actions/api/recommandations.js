import buildTask from '../../utils/redux-task';
import {getCurrentExitNode} from '../../utils/state-extract';

export const RECO_FETCH_REQUEST = '@@recommandation/FETCH_REQUEST';
export const RECO_FETCH_SUCCESS = '@@recommandation/FETCH_SUCCESS';
export const RECO_FETCH_FAILURE = '@@recommandation/FETCH_FAILURE';

export const fetchRecommandations = (...args) => (dispatch, getState, {services}) => {
  const {Disciplines} = services;
  console.log('CUR:EXITNODE', getCurrentExitNode(getState()));

  const action = buildTask({
    types: [RECO_FETCH_REQUEST, RECO_FETCH_SUCCESS, RECO_FETCH_FAILURE],
    task: () => Disciplines.getRecommendations(),
    meta: {} // ,
    // bailout: // WHAT ?
  });

  return dispatch(action);
};
