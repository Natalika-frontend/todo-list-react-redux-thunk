import {
	ADD_TODO, SET_EDITING_TASK_ID,
	SET_ERROR,
	SET_FILTERED_TODOS,
	SET_IS_CREATING, SET_IS_DELETED, SET_IS_DELETING, SET_IS_EDITING,
	SET_IS_LOADING, SET_IS_SEARCHING, SET_TASK_TEXT,
	SET_TODOS,
} from '../constants/actions-constants';

export const setIsLoading = (status) => ({
	type: SET_IS_LOADING,
	payload: status
});

export const setTodos = (todos) => ({
	type: SET_TODOS,
	payload: todos,
});

export const setFilteredTodos = (todos) => ({
	type: SET_FILTERED_TODOS,
	payload: todos,
});

export const setIsCreating = (status) => ({
	type: SET_IS_CREATING,
	payload: status,
});

export const setError = (errorMessage) => ({
	type: SET_ERROR,
	payload: errorMessage,
});

export const setIsSearching = (status) => ({
	type: SET_IS_SEARCHING,
	payload: status,
});

export const setTaskText = (taskText) => ({
	type: SET_TASK_TEXT,
	payload: taskText,
});

export const addTodo = (task) => ({
	type: ADD_TODO,
	payload: task,
});

export const setIsDeleted = (status) => ({
	type: SET_IS_DELETED,
	payload: status,
});

export const setIsDeleting = (status) => ({
	type: SET_IS_DELETING,
	payload: status,
});

export const setIsEditing = (status) => ({
	type: SET_IS_EDITING,
	payload: status,
});

export const setEditingTaskId = (id) => ({
	type: SET_EDITING_TASK_ID,
	payload: id,
});
