import styles from './App.module.css';
import { Header, Task, Search, Footer } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { setIsSorting } from './actions/sort-actions';
import { setSearchPhrase, setShowSearch } from './actions/search-actions';
import { useEffect } from 'react';
import { readTodos } from './actions/async-crud-actions';
import { selectError, selectFilteredTodos, selectIsLoading, selectIsSorting, selectShowSearch } from './selectors';

function App() {
	const dispatch = useDispatch();
	const filteredTodos = useSelector(selectFilteredTodos);
	const error = useSelector(selectError);
	const isLoading = useSelector(selectIsLoading);
	const showSearch = useSelector(selectShowSearch);
	const isSorting = useSelector(selectIsSorting);

	useEffect(() => {
		dispatch(readTodos());
	}, [dispatch]);

	const handleSearch = (searchValue) => {
		dispatch(setShowSearch(true));
		dispatch(setIsSorting(!isSorting));
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
