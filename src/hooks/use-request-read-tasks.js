import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoader } from '../selectors';
import { setFilteredTodos, setIsLoading, setTodos } from '../actions/task-actions';

export const useRequestReadTasks = () => {
	const dispatch = useDispatch();
	const isLoading = useSelector(selectLoader);

	const fetchTodos = () => {
		dispatch(setIsLoading(true));
		fetch('http://localhost:3015/todos')
			.then((loadedData) => loadedData.json())
			.then((loadedTodos) => {
				dispatch(setTodos(loadedTodos));
				dispatch(setFilteredTodos(loadedTodos));
			})
			.finally(() => {
				dispatch(setIsLoading(false));
			});
	};

	useEffect(() => {
		fetchTodos();
	}, []);

	return { isLoading, fetchTodos };
};
