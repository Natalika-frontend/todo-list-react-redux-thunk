import { useDispatch, useSelector } from 'react-redux';
import { selectError, selectIsCreating, selectTaskText, selectTodos } from '../selectors';
import { setIsCreating, setError, setIsSearching, setTaskText, addTodo } from '../actions/task-actions';

export const useRequestCreateTask = () => {
	const dispatch = useDispatch();
	const todos = useSelector(selectTodos);
	const isCreating = useSelector(selectIsCreating);
	const error = useSelector(selectError);
	const taskText = useSelector(selectTaskText);

	const requestAddTask = () => {
		dispatch(setIsCreating(true));
		dispatch(setIsSearching(false));

		const isDuplicateTask = todos.some(todo =>
			todo.title.toLowerCase() === taskText.trim().toLowerCase()
		);

		if (isDuplicateTask) {
			dispatch(setError('Задача уже существует'));
			dispatch(setIsCreating(false));
			return;
		}

		fetch('http://localhost:3015/todos', {
			method: 'POST',
			headers: {'Content-Type': 'application/json; charset=utf-8'},
			body: JSON.stringify({
				title: taskText,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((newTodo) => {
				dispatch(addTodo(newTodo));
				dispatch(setTaskText(''));
				dispatch(setError(''));
			})
			.catch(() => {
				dispatch(setError('Ошибка при добавлении задачи'));
			})
			.finally(() => {
				dispatch(setIsCreating(false));
			});
	};
	return { isCreating, error, requestAddTask, setError };
};
