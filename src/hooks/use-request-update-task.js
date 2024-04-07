import { useDispatch, useSelector } from 'react-redux';
import { selectTaskText, selectTodos } from '../selectors';
import { setEditingTaskId, setIsEditing, setTaskText } from '../actions/task-actions';

export const useRequestUpdateTask = (fetchTodos) => {
	const dispatch = useDispatch();
	const todos = useSelector(selectTodos);
	const taskText = useSelector(selectTaskText);

	const requestUpdateTask = (id) => {
		const updatedTodo = todos.find(todo => todo.id === id);
		if (updatedTodo) {
			updatedTodo.title = taskText;
			fetch(`http://localhost:3015/todos/${id}`, {
				method: 'PUT',
				headers: {'Content-Type': 'application/json; charset=utf-8'},
				body: JSON.stringify(updatedTodo),
			})
				.then(() => {
					fetchTodos();
					dispatch(setEditingTaskId(null));
				})
				.finally(() => {
					dispatch(setTaskText(''));
					dispatch(setIsEditing(false));
				});
		}
	};
	return {
		requestUpdateTask,
	};
};
