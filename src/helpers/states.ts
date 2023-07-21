import { PageType } from '../constants/enums/page-type';
import useState from './hooks/useState';
import { getLikedMoviesLS } from './local-storage';
import { Movie } from '../types';

export const [page, setPage] = useState<number>(1);
export const [pageType, setPageType] = useState(PageType.POPULAR);
export const [likedMoviesID, setLikedMoviesID] = useState<number[]>(getLikedMoviesLS());
export const [likedMovies, setLikedMovies] = useState<Movie[]>([]);
export const [movies, setMovies] = useState<Movie[]>([]);
export const [query, setQuery] = useState<string>('');
