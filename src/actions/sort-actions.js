import { SET_IS_SORTING } from '../constants/sort-constants';

export const setIsSorting = (status) => ({
	type: SET_IS_SORTING,
	payload: status,
});
