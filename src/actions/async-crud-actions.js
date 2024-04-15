import { CREATE_TODO, DELETE_TODO, READ_TODOS, UPDATE_TODO } from '../constants/actions-constants';

const fetchTodos = () => {
	return fetch('http://localhost:3015/todos')
		.then((loadedData) => loadedData.json());
};

const fetchCreateTodo = (taskText) => {
	return fetch('http://localhost:3015/todos', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json; charset=utf-8' },
		body: JSON.stringify({
			title: taskText,
		}),
	})
		.then((rawResponse) => rawResponse.json());
};

const fetchDeleteTodo = (id) => {
	return fetch(`http://localhost:3015/todos/${id}`, {
		method: 'DELETE',
	});
};

const fetchUpdateTodo = (id, taskText) => {
		return fetch(`http://localhost:3015/todos/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json; charset=utf-8' },
			body: JSON.stringify({title: taskText}),
		});
};


export const readTodos = () => (dispatch) => {
	return fetchTodos().then((todosData) => dispatch({
		type: READ_TODOS,
		payload: todosData,
	}));
};

export const createTodos = (taskText) => (dispatch) => {
	return fetchCreateTodo(taskText).then((newTodo) => {
		dispatch({
			type: CREATE_TODO,
			payload: newTodo,
		});
	});
};

export const deleteTodo = (id) => (dispatch) => {
	return fetchDeleteTodo(id).then(() => {
		dispatch({
			type: DELETE_TODO,
			payload: id,
		});
	});
};

export const updateTodo = (id, taskText) => (dispatch) => {
	return fetchUpdateTodo(id, taskText).then(() => {
		dispatch({
			type: UPDATE_TODO,
			payload: id,
			taskText: taskText,
		});
	});
};
