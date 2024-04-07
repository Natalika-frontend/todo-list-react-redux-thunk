import styles from './footer.module.css';
import { Button } from '../button/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectEditingTaskId,
	selectIsCreating,
	selectIsEditing, selectIsSearching, selectIsSorting,
	selectSearchPhrase, selectShowSearch,
	selectTaskText, selectTodos,
} from '../../selectors';
import { setError, setFilteredTodos, setIsEditing, setIsSearching, setTaskText } from '../../actions/task-actions';
import { useEffect } from 'react';
import { useRequestCreateTask, useRequestReadTasks, useRequestUpdateTask } from '../../hooks';
import { setIsSorting } from '../../actions/sort-actions';
import { setShowSearch } from '../../actions/search-actions';

export const Footer = () => {
	const dispatch = useDispatch();
	const todos = useSelector(selectTodos);
	const editingTaskId = useSelector(selectEditingTaskId);
	const searchPhrase = useSelector(selectSearchPhrase);
	const taskText = useSelector(selectTaskText);
	const isCreating = useSelector(selectIsCreating);
	const isEditing = useSelector(selectIsEditing);
	const showSearch = useSelector(selectShowSearch);
	const isSearching = useSelector(selectIsSearching);
	const isSorting = useSelector(selectIsSorting);

	const { fetchTodos } = useRequestReadTasks();
	const { requestAddTask } = useRequestCreateTask();
	const { requestUpdateTask } = useRequestUpdateTask(fetchTodos);

	const handleAddButtonClick = () => {
		if (taskText.trim() !== '') {
			if (editingTaskId !== null) {
				requestUpdateTask(editingTaskId);
			} else {
				dispatch(setIsEditing(false));
				requestAddTask(taskText);
			}
		}
	};

	const onChangeSorting = ({ target }) => {
		dispatch(setIsSorting(target.checked));
		const sortedTodos = [...todos].sort((a, b) => a.title.localeCompare(b.title));
		dispatch(setFilteredTodos(sortedTodos));
		dispatch(setError(''));
	};

	const toggleSearch = () => {
		dispatch(setIsSorting(isSorting));
		dispatch(setShowSearch(!showSearch));
		dispatch(setIsSearching(!isSearching));
		dispatch(setError(''));
	};

	useEffect(() => {
		let filtered = todos;
		if (searchPhrase.trim() !== '') {
			filtered = filtered.filter(({ title }) => title.toLowerCase().includes(searchPhrase.toLowerCase()));
		}
		if (isSorting) {
			filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
		}
		dispatch(setFilteredTodos(filtered));
	}, [searchPhrase, isSorting, todos]);

	return (
		<div className={styles.footer}>
			<input
				type="text"
				value={taskText}
				onChange={({ target }) => {
					dispatch(setTaskText(target.value));
					dispatch(setError(''));
					dispatch(setShowSearch(false));
					dispatch(setIsSearching(false));
				}}
				placeholder="Введите задачу"
				className={styles.input}
			/>
			<Button disabled={isCreating || taskText.trim() === ''}
					onClick={handleAddButtonClick}>{isEditing ?
				<FontAwesomeIcon icon={faPenToSquare} /> : '+'}
			</Button>
			<Button onClick={toggleSearch}>
				<FontAwesomeIcon icon={faMagnifyingGlass} />
			</Button>
			<input
				type="checkbox"
				className={styles.sortCheckbox}
				checked={isSorting}
				onChange={onChangeSorting}
			/>
		</div>
	);
};
