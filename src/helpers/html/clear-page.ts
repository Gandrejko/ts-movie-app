const clearPage = () => {
    const moviesContainer = document.getElementById('film-container');
    if (moviesContainer) {
        moviesContainer.innerHTML = '';
    }
};

export default clearPage;
