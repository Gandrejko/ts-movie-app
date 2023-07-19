import { getMovies } from './get-movies';
import { page, setMovies } from './states';
import renderRandomBanner from './html/render-random-banner';
import renderMovieCards from './html/render-movie-cards';

async function render(): Promise<void> {
    const newMovies = await getMovies();
    setMovies(newMovies);
    const randomMovie = newMovies[Math.floor(Math.random() * newMovies.length)];
    if (page() === 1) {
        renderRandomBanner(randomMovie);
    }
    renderMovieCards(newMovies);
}

export default render;
