import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles/styles.css';

import Api from './api/api';
import { Movie } from './types';
import { CardVariant } from './config/enums/card-variant.enum';
import { getLikedMoviesLS, updateLS } from './helpers/local-storage';
import { API_IMAGE_URL } from './config/env-config';
// eslint-disable-next-line import/no-cycle
import createMovieCard from './helpers/create-movie-card';

const { getPopularMovies, getUpcomingMovies, getRatedMovies, getMoviesByQuery, getMovieById } = Api;

const moviesContainer = document.getElementById('film-container');
const loadMoreBtn = document.getElementById('load-more');
const tabs: NodeListOf<HTMLLabelElement> = document.querySelectorAll('.tab');
const searchBtn = document.getElementById('submit');
const searchInput: HTMLInputElement | null = document.getElementById('search') as HTMLInputElement;
const favListBtn = document.querySelector('.navbar-toggler');

let page = 1;

const requestMap: Record<string, (page: number) => Promise<Movie[]>> = {
    Popular: getPopularMovies,
    Upcoming: getUpcomingMovies,
    'Top rated': getRatedMovies,
};

let pageType = 'Popular';
let likedMovies: number[] = getLikedMoviesLS();
let movies: Movie[] = [];

const clearPage = () => {
    if (moviesContainer) {
        moviesContainer.innerHTML = '';
    }
};

const loadMore = () => {
    page += 1;
    render();
};

const changePageType = (btnName: string) => {
    clearPage();
    page = 1;
    pageType = btnName;
    render();
};

const renderFavoriteList = () => {
    const favoriteMovies = document.getElementById('favorite-movies');
    if (favoriteMovies) favoriteMovies.innerHTML = '';
    likedMovies.map(async (movieId: number) => {
        const movieDetails: Movie = await getMovieById(movieId);
        const cardParent = document.createElement('div');
        cardParent.classList.value = 'col-12 p-2';
        cardParent.append(createMovieCard(movieDetails, CardVariant.FAVORITE, likedMovies));
        favoriteMovies?.insertAdjacentElement('afterbegin', cardParent);
    });
};

export const toggleLike = (like: SVGSVGElement, id: number, cardVariant: CardVariant) => {
    const currentLikeValue = like.dataset.like as string;
    const parsedLikeValue = JSON.parse(currentLikeValue);
    const newLikeValue = (!parsedLikeValue).toString();
    document.querySelector(`[data-id="${like.dataset.id}"]`)?.setAttribute('data-like', newLikeValue);
    const isLiked = JSON.parse(like.dataset.like as string);
    like.setAttribute('fill', isLiked ? 'red' : '#ff000078');

    likedMovies = likedMovies.includes(id) ? likedMovies.filter((movieId) => movieId !== id) : [...likedMovies, id];
    if (cardVariant === CardVariant.FAVORITE) {
        clearPage();
        render();
    }
    updateLS(likedMovies);
};

const searchMovies = async () => {
    const query: string = searchInput?.value;
    if (query.trim() === '') {
        return;
    }
    clearPage();
    page = 1;
    movies = await getMoviesByQuery(page, query);
    if (moviesContainer) {
        movies.map((movie) => moviesContainer.append(createMovieCard(movie, CardVariant.COMMON, likedMovies)));
    }
};

export const renderRandomBanner = (movie: Movie) => {
    const { backdropPath, title, overview } = movie;

    const banner = document.getElementById('random-movie');
    const titleBanner = document.getElementById('random-movie-name');
    const descriptionBanner = document.getElementById('random-movie-description');

    if (titleBanner) titleBanner.innerText = title;
    if (descriptionBanner && overview) descriptionBanner.innerText = overview;
    if (banner && backdropPath) banner.style.backgroundImage = `url(${API_IMAGE_URL}/${backdropPath})`;
};

searchBtn?.addEventListener('click', searchMovies);
tabs.forEach((tab) => tab.addEventListener('click', () => changePageType(tab.innerText)));
loadMoreBtn?.addEventListener('click', loadMore);
favListBtn?.addEventListener('click', renderFavoriteList);

async function render(): Promise<void> {
    movies = await requestMap[pageType](page);
    const randomMovie = movies[Math.floor(Math.random() * movies.length)];
    if (page === 1) {
        renderRandomBanner(randomMovie);
    }
    if (moviesContainer) {
        movies.map((movie) => moviesContainer.append(createMovieCard(movie, CardVariant.COMMON, likedMovies)));
    }
}

window.addEventListener('DOMContentLoaded', render);
