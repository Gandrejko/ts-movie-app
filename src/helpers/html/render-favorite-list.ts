import { CardVariant } from '../../constants/enums/card-variant.enum';
import { Movie } from '../../types';
import { getLikedMoviesLS } from '../local-storage';
import createMovieCard from './create-movie-card';
import { likedMoviesID, setLikedMoviesID } from '../states';

const renderFavoriteList = (favoriteMovies: Movie[]) => {
    setLikedMoviesID(getLikedMoviesLS());
    const favoriteMoviesElement = document.getElementById('favorite-movies');
    if (favoriteMoviesElement) favoriteMoviesElement.innerHTML = '';
    favoriteMovies.forEach((movie: Movie) => {
        const cardParent = document.createElement('div');
        cardParent.classList.value = 'col-12 p-2';
        cardParent.append(createMovieCard(movie, CardVariant.FAVORITE, likedMoviesID()));
        favoriteMoviesElement?.insertAdjacentElement('afterbegin', cardParent);
    });
};

export default renderFavoriteList;
