import styles from './task.module.css';
import { Button } from '../button/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { setEditingTaskId, setIsEditing, setTaskText } from '../../actions/task-actions';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsDeleting } from '../../selectors';
import { useRequestDeleteTask } from '../../hooks';

export const Task = ({ id, title, fetchTodos }) => {
	const dispatch = useDispatch();
	const isDeleting = useSelector(selectIsDeleting);;

	const handleEditTask = (id, title) => {
		dispatch(setIsEditing(true));
		dispatch(setEditingTaskId(id));
		dispatch(setTaskText(title));
	};

	const {requestDeleteTask} = useRequestDeleteTask(fetchTodos);

	return (
		<li key={id} className={styles.task}>
			<p className={styles.taskTitle}>{title}</p>
			<Button onClick={() => handleEditTask(id, title)}>
				<FontAwesomeIcon icon={faPenToSquare} />
			</Button>
			<Button disabled={isDeleting} onClick={() => requestDeleteTask(id)}>Удалить</Button>
		</li>
	);
};
