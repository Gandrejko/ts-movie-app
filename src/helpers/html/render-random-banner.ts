import { Movie } from '../../types';
import { API_IMAGE_URL } from '../../config/env-config';

const renderRandomBanner = (movie: Movie) => {
    const { backdrop_path: backdropPath, title, overview } = movie;

    const banner = document.getElementById('random-movie');
    const titleBanner = document.getElementById('random-movie-name');
    const descriptionBanner = document.getElementById('random-movie-description');

    if (titleBanner) titleBanner.innerText = title;
    if (descriptionBanner && overview) descriptionBanner.innerText = overview;
    if (banner && backdropPath) banner.style.backgroundImage = `url(${API_IMAGE_URL}/${backdropPath})`;
};

export default renderRandomBanner;
