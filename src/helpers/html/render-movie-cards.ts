import { CardVariant } from '../../constants/enums/card-variant.enum';
import createMovieCard from './create-movie-card';
import { Movie } from '../../types';
import { likedMoviesID } from '../states';

const renderMovieCards = (movies: Movie[]) => {
    const moviesCards = movies.map((movie) => createMovieCard(movie, CardVariant.COMMON, likedMoviesID()));
    const moviesContainer = document.getElementById('film-container');
    moviesCards.map((movie) => moviesContainer?.append(movie));
};

export default renderMovieCards;
