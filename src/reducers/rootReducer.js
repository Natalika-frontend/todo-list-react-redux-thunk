import { combineReducers } from 'redux';
import { taskReducer } from './task-reducer';
import { searchReducer } from './search-reducer';
import { sortReducer } from './sort-reducer';
import { filterReducer } from './filter-reducer';

export const rootReducer = combineReducers({
	tasks: taskReducer,
	search: searchReducer,
	sort: sortReducer,
	filter: filterReducer,
});
