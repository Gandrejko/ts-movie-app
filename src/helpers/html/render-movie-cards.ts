import createMovieCard from './create-movie-card';
import { CardVariant } from '../../config/enums/card-variant.enum';
import { Movie } from '../../types';
import { likedMoviesID } from '../states';

const renderMovieCards = (movies: Movie[]) => {
    const moviesCards = movies.map((movie) => createMovieCard(movie, CardVariant.COMMON, likedMoviesID()));
    const moviesContainer = document.getElementById('film-container');
    moviesCards.map((movie) => moviesContainer?.append(movie));
};

export default renderMovieCards;
