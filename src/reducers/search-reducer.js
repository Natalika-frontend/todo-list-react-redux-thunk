import { initialState } from '../store/initial-state';
import { SET_IS_SEARCHING, SET_SEARCH_PHRASE, SET_SHOW_SEARCH } from '../constants/search-constants';

export const searchReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_SEARCH_PHRASE:
			return {
				...state,
				searchPhrase: action.payload,
			}
			case SET_SHOW_SEARCH:
				return {
					...state,
					showSearch: action.payload,
				}
		case SET_IS_SEARCHING:
			return {
				...state,
				isSearching: action.payload,
			}
		default:
			return state;
	}
};
