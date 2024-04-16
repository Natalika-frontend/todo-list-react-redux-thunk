import {
	CREATE_TODO,
	DELETE_TODO,
	READ_TODOS,
	UPDATE_TODO,
} from '../constants/actions-constants';

const initialState = {
	todos: [],
};

export const crudReducer = (state = initialState, action) => {
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
		default:
			return state;
	}
};
