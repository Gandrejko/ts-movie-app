import { Endpoints } from '../constants/enums/endpoints.enum';
import { Movie, MovieRequestDto, MovieResponseDto } from '../types';
import removeEmptyKeys from '../helpers/remove-empty-keys';
import { API_KEY, API_URL } from '../config/env-config';

class Api {
    public apiUrl: string;

    public apiKey: string;

    constructor(apiUrl: string, apiKey: string) {
        this.apiUrl = apiUrl;
        this.apiKey = apiKey;
    }

    private getData = async ({ endpoint, page, query, movieId }: MovieRequestDto) => {
        const params: Record<string, string> = {
            api_key: this.apiKey,
            page: page?.toString() || '',
            query: query?.toString() || '',
        };

        const URLParams = new URLSearchParams(removeEmptyKeys(params)).toString();

        const response = await fetch(`${this.apiUrl}${endpoint}${movieId ? `/${movieId}` : ''}?${URLParams}`);
        return response.json();
    };

    private mapper = (movie: MovieResponseDto): Movie => ({
        id: movie.id,
        poster_path: movie.poster_path,
        overview: movie.overview,
        release_date: movie.release_date,
        title: movie.title,
        backdrop_path: movie.backdrop_path,
    });

    getPopularMovies = async (page = 1): Promise<Movie[]> => {
        const endpoint = Endpoints.POPULAR_MOVIES;
        const { results } = await this.getData({ endpoint, page });

        return results.map((movie: MovieResponseDto) => this.mapper(movie));
    };

    getUpcomingMovies = async (page = 1): Promise<Movie[]> => {
        const endpoint = Endpoints.UPCOMING_MOVIES;
        const { results } = await this.getData({ endpoint, page });

        return results.map((movie: MovieResponseDto) => this.mapper(movie));
    };

    getRatedMovies = async (page = 1): Promise<Movie[]> => {
        const endpoint = Endpoints.TOP_RATED_MOVIES;
        const { results } = await this.getData({ endpoint, page });

        return results.map((movie: MovieResponseDto) => this.mapper(movie));
    };

    getMoviesByQuery = async (page = 1, query = ''): Promise<Movie[]> => {
        const endpoint = Endpoints.SEARCH_MOVIES;
        const { results } = await this.getData({ endpoint, page, query });

        return results.map((movie: MovieResponseDto) => this.mapper(movie));
    };

    getMovieById = async (movieId: number): Promise<Movie> => {
        const endpoint = Endpoints.MOVIE_BY_ID;
        const data = await this.getData({ endpoint, movieId });

        return this.mapper(data);
    };
}

export default new Api(API_URL, API_KEY);
