import { PageType } from '../constants/enums/page-type';
import { Movie } from '../types';
import Api from '../api/api';
import { likedMoviesID, page, pageType, query } from './states';

const { getPopularMovies, getUpcomingMovies, getRatedMovies, getMovieById, getMoviesByQuery } = Api;
export const requestMap: Record<string, (page: number) => Promise<Movie[]>> = {
    [PageType.POPULAR]: getPopularMovies,
    [PageType.UPCOMING]: getUpcomingMovies,
    [PageType.TOP_RATED]: getRatedMovies,
    [PageType.SEARCH]: (newPage: number) => getMoviesByQuery(newPage, query()),
};

export const getMovies = async () => requestMap[pageType()](page());

export const getFavoriteMovies = async () =>
    Promise.all(likedMoviesID().map((movieId: number) => getMovieById(movieId)));
