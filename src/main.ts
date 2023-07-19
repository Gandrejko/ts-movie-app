import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles/styles.css';
import { PageType } from './constants/enums/page-type';
import changePageType from './helpers/change-page-type';
import loadMore from './helpers/load-more';

import render from './helpers/render';
import { getFavoriteMovies } from './helpers/get-movies';
import searchMovies from './helpers/search-movies';
import { likedMovies, page, setLikedMovies } from './helpers/states';
import renderFavoriteList from './helpers/html/render-favorite-list';

const loadMoreBtn = document.getElementById('load-more');
const tabs: NodeListOf<HTMLLabelElement> = document.querySelectorAll('.tab');
const searchBtn = document.getElementById('submit');
const searchInput = document.getElementById('search');
const favListBtn = document.querySelector('.navbar-toggler');

searchBtn?.addEventListener('click', searchMovies);
searchInput?.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
        await searchMovies();
    }
});
tabs.forEach((tab) =>
    tab.addEventListener('click', async () => {
        const tabId = tab.id as PageType;
        const isValid = Object.values(PageType).includes(tabId);

        if (isValid) {
            await changePageType(tabId);
        }
    })
);
loadMoreBtn?.addEventListener('click', () => loadMore(page()));
favListBtn?.addEventListener('click', async () => {
    const newLikedMovies = await getFavoriteMovies();
    setLikedMovies(newLikedMovies);
    renderFavoriteList(likedMovies());
});

window.addEventListener('DOMContentLoaded', render);
