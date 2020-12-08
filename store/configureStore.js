import { createStore, combineReducers, compose } from 'redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
        weatherReports: weatherReportsReducer
    }),
  );

  store.subscribe(() => console.log(store.getState()));

  return store;
};