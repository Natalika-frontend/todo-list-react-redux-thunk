import { applyMiddleware, compose, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import { combineReducers } from 'redux';
import { searchReducer, sortReducer, taskReducer } from './reducers';

export const rootReducer = combineReducers({
	tasks: taskReducer,
	search: searchReducer,
	sort: sortReducer,
});


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
