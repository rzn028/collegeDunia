import { createStore, combineReducers, compose } from 'redux';
import weatherReports from '../reducers/weatherReports';

export default () => {
  const store = createStore(
    combineReducers({
        weatherReports: weatherReports
    }),
  );

  store.subscribe(() => console.log(store.getState()));

  return store;
};