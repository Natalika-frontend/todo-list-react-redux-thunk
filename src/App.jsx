import styles from './App.module.css';
import { Header, Task, Search, Footer } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { setIsSorting } from './actions/sort-actions';
import { setSearchPhrase } from './actions/search-actions';
import { useEffect } from 'react';
import { readTodos } from './actions/async-crud-actions';
import { selectError, selectIsLoading, selectShowSearch, selectTodos } from './selectors';

function App() {
	const dispatch = useDispatch();
	const todos = useSelector(selectTodos);
	const error = useSelector(selectError);
	const isLoading = useSelector(selectIsLoading);
	const showSearch = useSelector(selectShowSearch);

	useEffect(() => {
		dispatch(readTodos());
	}, [dispatch]);

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
						todos.map(({ id, title }) => (
							<Task key={id}
								  id={id}
								  title={title}
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
