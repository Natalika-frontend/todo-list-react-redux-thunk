import { SET_IS_SEARCHING, SET_SEARCH_PHRASE, SET_SHOW_SEARCH } from '../constants/search-constants';

export const setSearchPhrase = (searchPhrase) => ({
	type: SET_SEARCH_PHRASE,
	payload: searchPhrase,
});

export const setShowSearch = (status) => ({
	type: SET_SHOW_SEARCH,
	payload: status,
});

export const setIsSearching = (status) => ({
	type: SET_IS_SEARCHING,
	payload: status,
});
