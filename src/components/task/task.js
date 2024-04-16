import styles from './task.module.css';
import { Button } from '../button/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { deleteTodo, updateTodo } from '../../actions/async-crud-actions';
import { setEditingTaskId, setIsEditing, setTaskText } from '../../actions/task-actions';

export const Task = ({ id, title }) => {
	const dispatch = useDispatch();

	const handleEditTask = (id, title) => {
		dispatch(setEditingTaskId(id));
		dispatch(setIsEditing(true));
		dispatch(setTaskText(title));
		dispatch(updateTodo(id, title));
	};

	const handleDeleteTask = (id) => {
		dispatch(deleteTodo(id));
	};

	return (
		<li key={id} className={styles.task}>
			<p className={styles.taskTitle}>{title}</p>
			<Button onClick={() => handleEditTask(id, title)}>
				<FontAwesomeIcon icon={faPenToSquare} />
			</Button>
			<Button onClick={() => handleDeleteTask(id)}>Удалить</Button>
		</li>
	);
};
