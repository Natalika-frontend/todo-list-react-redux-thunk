import styles from './task.module.css';
import { Button } from '../button/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

export const Task = ({ id, title, handleEditTask, isDeleting, handleDeleteTask }) => {

	return (
		<li className={styles.task}>
			<p className={styles.taskTitle}>{title}</p>
			<Button onClick={() => handleEditTask(id, title)}>
				<FontAwesomeIcon icon={faPenToSquare}/>
			</Button>
			<Button disabled={isDeleting} onClick={handleDeleteTask}>Удалить</Button>
		</li>
	);
};
