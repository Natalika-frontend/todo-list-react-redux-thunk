import { SET_ERROR, SET_FILTERED_TODOS, SET_IS_EDITING, SET_TASK_TEXT } from '../constants/actions-constants';

export const setError = (error) => ({
	type: SET_ERROR,
	payload: error,
});

export const setFilteredTodos = (filteredTodos) => ({
	type: SET_FILTERED_TODOS,
	payload: filteredTodos,
});

export const setTaskText = (taskText) => ({
	type: SET_TASK_TEXT,
	payload: taskText,
});

export const setIsEditing = (status) => ({
	type: SET_IS_EDITING,
	payload: status,
});
