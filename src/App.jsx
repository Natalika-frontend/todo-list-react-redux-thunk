import styles from './App.module.css';
import {
	useRequestCreateTask,
	useRequestDeleteTask,
	useRequestReadTasks,
	useRequestUpdateTask,
	useTaskText,
} from './hooks';
import { useEffect, useState } from 'react';
import { Header } from './components/header/header';
import { Task } from './components/task/task';
import { Search } from './components/searh/search';
import { Footer } from './components/footer/footer';

function App() {
	const { taskText, setTaskText } = useTaskText();
	const [searchPhrase, setSearchPhrase] = useState('');
	const [filteredTodos, setFilteredTodos] = useState([]);
	const [showSearch, setShowSearch] = useState(false);

	const [isSearching, setIsSearching] = useState(false);
	const [isSearch, setIsSearch] = useState(false);
	const [isSorting, setIsSorting] = useState(false);

	const { todos, isLoading, fetchTodos } = useRequestReadTasks();

	const {isDeleting, requestDeleteTask} = useRequestDeleteTask(fetchTodos);

	const handleEditTask = (id, title) => {
		setIsEditing(true);
		setEditingTaskId(id);
		setTaskText(title);
	};

	const handleAddButtonClick = () => {
		if (taskText.trim() !== '') {
			if (editingTaskId !== null) {
				requestUpdateTask(editingTaskId);
			} else {
				setIsEditing(false);
				requestAddTask(taskText);
			}
		}
	};

	const {
		requestAddTask,
		isCreating,
		error: addTaskError,
		setError,
	} = useRequestCreateTask(fetchTodos, todos, setTaskText, setIsSearching);

	const {
		isEditing,
		editingTaskId,
		requestUpdateTask,
		setIsEditing,
		setEditingTaskId,
	} = useRequestUpdateTask(fetchTodos, todos, taskText, setTaskText);


	const onChangeSorting = ({ target }) => {
		setIsSorting(target.checked);
		const sortedTodos = [...todos].sort((a, b) => a.title.localeCompare(b.title));
		setFilteredTodos(sortedTodos);
		setError('');
	};

	const toggleSearch = () => {
		setShowSearch(!showSearch);
		setIsSearch(!isSearch);
		setError('');
	};

	const handleSearch = (searchValue) => {
		setSearchPhrase(searchValue);
	};

	useEffect(() => {
		const filtered = todos.filter(({ title }) =>
			title.toLowerCase().includes(searchPhrase.toLowerCase()),
		);
		setFilteredTodos(filtered);
	}, [searchPhrase, todos]);

	return (
		<div className={styles.app}>
			<div className={styles.container}>
				<Header headerTitle={'Список задач'} />
				{addTaskError && <div className={styles.error}>Такая задача уже есть</div>}
				<ul className={`${styles.taskList} ${styles.scrollableContainer}`}>
					{isLoading ? (
						<div className={styles.loader}></div>
					) : (
						((isSearch || isSorting) ? filteredTodos : todos).map(({ id, title }) => (
							<Task key={id}
								  id={id}
								  title={title}
								  handleEditTask={handleEditTask}
								  isDeleting={isDeleting}
								  handleDeleteTask={() => requestDeleteTask(id)}
							/>
						)))
					}
				</ul>
				{showSearch && (
					<Search onSearch={handleSearch} setIsSearching={setIsSearching} />
				)}
				<Footer taskText={taskText}
				setTaskText={setTaskText}
				setError={setError}
				handleAddButtonClick={handleAddButtonClick}
				isEditing={isEditing}
				isCreating={isCreating}
				toggleSearch={toggleSearch}
				isSorting={isSorting}
				onChangeSorting={onChangeSorting}
				/>
			</div>
		</div>
	);
}

export default App;
