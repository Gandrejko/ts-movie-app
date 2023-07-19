import clearPage from './html/clear-page';
import { setPage, setPageType } from './states';
import render from './render';

export const loadMore = (page: number) => {
    setPage(page + 1);
    render();
};

export const changePageType = (btnName: string) => {
    clearPage();
    setPage(1);
    setPageType(btnName);
    render();
};
