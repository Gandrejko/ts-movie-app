export type MovieRequestDto = {
    endpoint: string;
    page?: number;
    query?: string;
    movieId?: number;
};
export type MovieResponseDto = {
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

export type Movie = Pick<
    MovieResponseDto,
    'id' | 'poster_path' | 'overview' | 'release_date' | 'title' | 'backdrop_path'
>;
