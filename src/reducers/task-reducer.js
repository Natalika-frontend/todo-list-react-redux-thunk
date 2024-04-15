import {
	CREATE_TODO,
	DELETE_TODO,
	READ_TODOS,
	SET_ERROR, SET_FILTERED_TODOS, SET_IS_EDITING,
	SET_IS_LOADING,
	UPDATE_TODO,
} from '../constants/actions-constants';
import { SET_IS_SEARCHING } from '../constants/search-constants';

const initialState = {
	todos: [],
	taskText: '',
	isLoading: false,
	error: '',
	filteredTodos: [],
	isEditing: false,
	isCreating: false,
};

export const taskReducer = (state = initialState, action) => {
	switch (action.type) {
		case READ_TODOS:
			return {
				...state,
				todos: action.payload,
			};
		case CREATE_TODO:
			return {
				...state,
				todo: action.payload,
			};
		case DELETE_TODO:
			return {
				...state,
				todos: state.todos.filter(todo => todo.id !== action.payload),
			};
		case UPDATE_TODO:
			return {
				...state,
				todos: state.todos.map(todo => todo.id === action.payload ? { ...todo, title: action.taskText } : todo),
			};
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
			}
		default:
			return state;
	}
};
