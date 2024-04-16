import { applyMiddleware, compose, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import { combineReducers } from 'redux';
import { crudReducer, searchReducer, sortReducer, taskReducer } from './reducers';

export const rootReducer = combineReducers({
	crud: crudReducer,
	tasks: taskReducer,
	search: searchReducer,
	sort: sortReducer,
});


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
