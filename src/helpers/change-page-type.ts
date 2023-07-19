import { PageType } from '../constants/enums/page-type';
import clearPage from './html/clear-page';
import render from './render';
import { setPage, setPageType } from './states';

const changePageType = async (btnId: PageType) => {
    clearPage();
    setPage(1);
    setPageType(btnId);
    await render();
};

export default changePageType;
