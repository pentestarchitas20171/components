import {applyMiddleware, compose} from 'redux';
import {apiMiddleware} from 'redux-api-middleware';
import ReduxThunk from 'redux-thunk';
import {historyMiddleware} from '@coorpacademy/redux-history';
import routerMiddleware from './routes';

const middlewares = options => {
  return compose(
    applyMiddleware(
      ReduxThunk.withExtraArgument(options),
      apiMiddleware,
      historyMiddleware(options),
      routerMiddleware
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  );
};

export default middlewares;
