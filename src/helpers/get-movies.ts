import { Movie } from '../types';
import clearPage from './html/clear-page';
import renderMovieCards from './html/render-movie-cards';
import Api from '../api/api';
import { likedMoviesID, movies, page, pageType, setMovies, setPage } from './states';

const { getPopularMovies, getUpcomingMovies, getRatedMovies, getMovieById, getMoviesByQuery } = Api;

export const requestMap: Record<string, (page: number) => Promise<Movie[]>> = {
    Popular: getPopularMovies,
    Upcoming: getUpcomingMovies,
    'Top rated': getRatedMovies,
};

export const getMovies = async () => requestMap[pageType()](page());

export const getFavoriteMovies = async () =>
    Promise.all(likedMoviesID().map((movieId: number) => getMovieById(movieId)));

export const searchMovies = async () => {
    const searchInput: HTMLInputElement | null = document.getElementById('search') as HTMLInputElement;
    const query = searchInput?.value;
    if (query.trim() === '') {
        return;
    }
    clearPage();
    setPage(1);
    const newMovies = await getMoviesByQuery(page(), query);
    setMovies(newMovies);
    renderMovieCards(movies());
};
