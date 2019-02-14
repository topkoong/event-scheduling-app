import {createStore, combineReducers, applyMiddleware} from 'redux';
import loggingMiddleware from 'redux-logger';
import eventReducer from './eventReducer';

const reducer = combineReducers({events: eventReducer});
const middleware = applyMiddleware(loggingMiddleware);

const store = createStore(reducer, middleware);
export default store;
export * from './eventReducer';