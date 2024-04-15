import styles from './footer.module.css';
import { Button } from '../button/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectIsCreating,
	selectIsEditing, selectIsSearching, selectIsSorting,
	selectSearchPhrase, selectShowSearch,
	selectTaskText, selectTodos,
} from '../../selectors';
import { setError, setFilteredTodos, setTaskText } from '../../actions/task-actions';
import { useEffect } from 'react';
import { setIsSorting } from '../../actions/sort-actions';
import { setIsSearching, setShowSearch } from '../../actions/search-actions';
import { createTodos } from '../../actions/async-crud-actions';

export const Footer = () => {
	const dispatch = useDispatch();
	const todos = useSelector(selectTodos);
	const showSearch = useSelector(selectShowSearch);
	const taskText = useSelector(selectTaskText);
	const isSorting = useSelector(selectIsSorting);
	const isSearching = useSelector(selectIsSearching);
	const searchPhrase = useSelector(selectSearchPhrase);
	const isCreating = useSelector(selectIsCreating);
	const isEditing = useSelector(selectIsEditing);

	const handleAddButtonClick = () => {
		if (taskText.trim() !== '') {
				dispatch(createTodos(taskText));
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

	const handleChange = ({ target }) => {
		dispatch(setTaskText(target.value));
		dispatch(setError(''));
		dispatch(setShowSearch(false));
		dispatch(setIsSearching(false));
	}

	useEffect(() => {
		let filtered = todos;
		if (searchPhrase.trim() !== '') {
			filtered = filtered.filter(({ title }) => title.toLowerCase().includes(searchPhrase.toLowerCase()));
		}
		if (isSorting) {
			filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
		}
		dispatch(setFilteredTodos(filtered));
	}, [dispatch, searchPhrase, isSorting, todos]);

	return (
		<div className={styles.footer}>
			<input
				type="text"
				value={taskText}
				onChange={handleChange}
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
