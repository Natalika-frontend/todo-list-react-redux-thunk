import styles from './App.module.css';
import { Header, Task, Search, Footer } from './components';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectError,
	selectFilteredTodos,
	selectLoader, selectShowSearch,
} from './selectors';
import { useRequestReadTasks } from './hooks';
import { setIsSorting } from './actions/sort-actions';
import { setSearchPhrase } from './actions/search-actions';

function App() {
	const dispatch = useDispatch();
	const filteredTodos = useSelector(selectFilteredTodos);
	const error = useSelector(selectError);
	const isLoading = useSelector(selectLoader);
	const showSearch = useSelector(selectShowSearch);

	const { fetchTodos } = useRequestReadTasks();

	const handleSearch = (searchValue) => {
		dispatch(setIsSorting(false));
		dispatch(setSearchPhrase(searchValue));
	};

	return (
		<div className={styles.app}>
			<div className={styles.container}>
				<Header headerTitle={'Список задач'} />
				{error && <div className={styles.error}>Такая задача уже есть</div>}
				<ul className={`${styles.taskList} ${styles.scrollableContainer}`}>
					{isLoading ? (
						<div className={styles.loader}></div>
					) : (
						filteredTodos.map(({ id, title }) => (
							<Task key={id}
								  id={id}
								  title={title}
								  fetchTodos={fetchTodos}
							/>
						)))
					}
				</ul>
				{showSearch && (
					<Search onSearch={handleSearch}/>
				)}
				<Footer />
			</div>
		</div>
	);
}

export default App;
