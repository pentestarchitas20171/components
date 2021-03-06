import {createStore} from 'redux';
import {render, unmountComponentAtNode} from 'react-dom';
import {syncStoreWithHistory} from '@coorpacademy/redux-history';
import {createBrowserHistory} from '@coorpacademy/history';
import createReducer from './reducers';
import createMiddleware from './middlewares';
import createMapStateToVnode from './routes';

const createUpdate = (container, {dispatch, getState}, options) => createMapStateToView => {
  const mapStateToView = createMapStateToView(options)(dispatch);

  return () => {
    const state = getState();
    const view = mapStateToView(state);
    return render(view, container);
  };
};

const create = options => {
  const {container} = options;

  const history = createBrowserHistory();

  const store = createStore(createReducer(options), {}, createMiddleware({...options, history}));

  let update = createUpdate(container, store, options)(createMapStateToVnode);
  let unsubscribe = store.subscribe(update);

  if (module.hot) {
    module.hot.accept('./view', function() {
      unsubscribe();
      update = createUpdate(container, store, options)(require('./view').default);
      update();
      unsubscribe = store.subscribe(update);
    });
  }

  syncStoreWithHistory(store, history);

  return {
    update: () => update(),
    unsubscribe: () => {
      unmountComponentAtNode(container);
      return unsubscribe();
    }
  };
};

export {create}; // eslint-disable-line import/prefer-default-export
