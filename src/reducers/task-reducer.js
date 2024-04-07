import { initialState } from '../store/initial-state';
import {
	ADD_TODO, SET_EDITING_TASK_ID,
	SET_ERROR,
	SET_FILTERED_TODOS,
	SET_IS_CREATING, SET_IS_DELETED, SET_IS_DELETING, SET_IS_EDITING,
	SET_IS_LOADING, SET_IS_SEARCHING, SET_TASK_TEXT,
	SET_TODOS,
} from '../constants/actions-constants';

export const taskReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_IS_LOADING:
			return {
				...state,
				isLoading: action.payload
			};
		case SET_TODOS:
			return {
				...state,
				todos: action.payload,
			}
		case SET_FILTERED_TODOS:
			return {
				...state,
				filteredTodos: action.payload,
			}
		case SET_IS_CREATING:
			return {
				...state,
				isCreating: action.payload,
			}
		case SET_ERROR:
			return {
				...state,
				error: action.payload,
			}
		case SET_IS_SEARCHING:
			return {
				...state,
				isSearching: action.payload,
			}
			case SET_TASK_TEXT:
			return {
				...state,
				taskText: action.payload,
			}
		case ADD_TODO:
			return {
				...state,
				todos: [...state.todos, action.payload],
			}
		case SET_IS_DELETED:
			return {
				...state,
				todos: [...state.todos, action.payload],
			}
		case SET_IS_DELETING:
			return {
				...state,
				todos: [...state.todos, action.payload],
			}
		case SET_IS_EDITING:
			return {
				...state,
				isEditing: action.payload,
			}
		case SET_EDITING_TASK_ID:
			return {
				...state,
				editingTaskId: action.payload,
			}
		default:
			return state;
	}
};
