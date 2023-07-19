import render from './render';
import { setPage } from './states';

const loadMore = async (page: number) => {
    setPage(page + 1);
    await render();
};

export default loadMore;
