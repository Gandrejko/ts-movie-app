const getLikedMoviesLS = () => JSON.parse(localStorage.getItem('likedMovies') || '[]');

const updateLS = (likedMovies: number[]) => {
    const movies = JSON.stringify(likedMovies);
    localStorage.setItem('likedMovies', movies);
};

export { getLikedMoviesLS, updateLS };
