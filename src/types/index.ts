type MovieRequestDto = {
    endpoint: string;
    page?: number;
    query?: string;
    movieId?: number;
};
type MovieResponseDto = {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
};

type Movie = {
    id: number;
    posterPath?: string;
    overview?: string;
    releaseDate?: string;
    title: string;
    backdropPath?: string;
};

export { type MovieRequestDto, type MovieResponseDto, type Movie };
