import { PageType } from '../constants/enums/page-type';
import changePageType from './change-page-type';
import { getMovies } from './get-movies';
import clearPage from './html/clear-page';
import renderMovieCards from './html/render-movie-cards';
import { movies, query, setMovies, setPage, setQuery } from './states';

const searchMovies = async () => {
    const searchInput: HTMLInputElement | null = document.getElementById('search') as HTMLInputElement;
    setQuery(searchInput?.value);
    searchInput.value = '';
    if (query().trim() === '') {
        return;
    }
    await changePageType(PageType.SEARCH);
    clearPage();
    setPage(1);
    const newMovies = await getMovies();
    setMovies(newMovies);
    renderMovieCards(movies());
};

export default searchMovies;
