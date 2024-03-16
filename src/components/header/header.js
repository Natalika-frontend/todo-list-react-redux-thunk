import styles from './header.module.css';

export const Header = ({headerTitle}) => {
	return (
		<div className={styles.header}>
			<h1>{headerTitle}</h1>
		</div>
	);
};
