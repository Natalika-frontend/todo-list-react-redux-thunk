import { SET_IS_SORTING } from '../constants/sort-constants';

const initialState = {
	isSorting: false,
};

export const sortReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_IS_SORTING:
			return {
				...state,
				isSorting: action.payload,
			}
		default:
			return state;
	}
};
