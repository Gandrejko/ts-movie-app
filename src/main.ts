import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles/styles.css';

import render from './helpers/render';
import { getFavoriteMovies, searchMovies } from './helpers/get-movies';
import { changePageType, loadMore } from './helpers/helpers';
import { likedMovies, page, setLikedMovies } from './helpers/states';
import renderFavoriteList from './helpers/html/render-favorite-list';

const loadMoreBtn = document.getElementById('load-more');
const tabs: NodeListOf<HTMLLabelElement> = document.querySelectorAll('.tab');
const searchBtn = document.getElementById('submit');
const favListBtn = document.querySelector('.navbar-toggler');

searchBtn?.addEventListener('click', searchMovies);
tabs.forEach((tab) => tab.addEventListener('click', () => changePageType(tab.innerText)));
loadMoreBtn?.addEventListener('click', () => loadMore(page()));
favListBtn?.addEventListener('click', async () => {
    const newLikedMovies = await getFavoriteMovies();
    setLikedMovies(newLikedMovies);
    renderFavoriteList(likedMovies());
});

window.addEventListener('DOMContentLoaded', render);
