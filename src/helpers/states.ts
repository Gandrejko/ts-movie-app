import useState from './hooks/useState';
import { getLikedMoviesLS } from './local-storage';
import { Movie } from '../types';

export const [page, setPage] = useState<number>(1);
export const [pageType, setPageType] = useState('Popular');
export const [likedMoviesID, setLikedMoviesID] = useState<number[]>(getLikedMoviesLS());
export const [likedMovies, setLikedMovies] = useState<Movie[]>([]);
export const [movies, setMovies] = useState<Movie[]>([]);
