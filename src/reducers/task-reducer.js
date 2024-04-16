import {
	SET_EDITING_TASK_ID,
	SET_ERROR,
	SET_FILTERED_TODOS,
	SET_IS_CREATING,
	SET_IS_EDITING,
	SET_IS_LOADING,
	SET_TASK_TEXT,
} from '../constants/actions-constants';
import { SET_IS_SEARCHING } from '../constants/search-constants';

const initialState = {
	taskText: '',
	isLoading: false,
	error: '',
	filteredTodos: [],
	isEditing: false,
	isCreating: false,
	editingTaskId: 0,
};

export const taskReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_IS_LOADING:
			return {
				...state,
				isLoading: action.payload,
			};
		case SET_IS_SEARCHING:
			return {
				...state,
				isSearching: action.payload,
			};
		case SET_TASK_TEXT:
			return {
				...state,
				taskText: action.payload,
			};
		case SET_ERROR:
			return {
				...state,
				error: action.payload,
			};
		case SET_FILTERED_TODOS:
			return {
				...state,
				filteredTodos: action.payload,
			};
		case SET_IS_EDITING:
			return {
				...state,
				isEditing: action.payload,
			};
		case SET_IS_CREATING:
			return {
				...state,
				isCreating: action.payload,
			};
		case SET_EDITING_TASK_ID:
			return {
				...state,
				editingTaskId: action.payload,
			}
		default:
			return state;
	}
};
