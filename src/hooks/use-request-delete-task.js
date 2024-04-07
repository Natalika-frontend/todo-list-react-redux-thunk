import { useDispatch
} from 'react-redux';
import { setIsDeleted, setIsDeleting } from '../actions/task-actions';

export const useRequestDeleteTask = (fetchTodos) => {
	const dispatch = useDispatch();

	const requestDeleteTask = (id) => {
		dispatch(setIsDeleting(true));

		fetch(`http://localhost:3015/todos/${id}`, {
			method: 'DELETE',
		})
			.then((rawResponse) => rawResponse.json())
			.then(() => {
				dispatch(setIsDeleted(true));
			})
			.finally(() => {
				fetchTodos();
				dispatch(setIsDeleting(false));
				dispatch(setIsDeleted(false));
			});
	};

	return {
		requestDeleteTask,
	};
};
