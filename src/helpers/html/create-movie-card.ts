import { API_IMAGE_URL } from '../../config/env-config';
import { CardVariant } from '../../constants/enums/card-variant.enum';
import { Movie } from '../../types';
import toggleLike from './toggle-like';

const createMovieCard = (movie: Movie, cardVariant: CardVariant, likedMoviesID: number[]) => {
    const { id, poster_path: posterPath, release_date: releaseDate, overview } = movie;
    const isLiked = likedMoviesID.includes(id);
    const movieCard: HTMLElement | null = document.createElement('div');
    movieCard.classList.add('col-12', 'p-2');
    if (cardVariant === CardVariant.COMMON) {
        movieCard.classList.add('col-lg-3', 'col-md-4');
    }
    movieCard.innerHTML = `
      <div class="card shadow-sm h-100">
            ${
                posterPath
                    ? `
              <img
                src=${API_IMAGE_URL + posterPath}
                alt="poster"
              />
          `
                    : `
              <div class="
                      d-flex
                      justify-content-between
                      align-items-center
                      h-100
                      align-self-center
                    "
                      >No image</div>
          `
            }
          <svg
              data-id=${id}
              data-like=${isLiked}
              data-variant=${cardVariant}
              xmlns="http://www.w3.org/2000/svg"
              stroke='red'
              fill=${isLiked ? 'red' : '#ff000078'}
              width="50"
              height="50"
              class="bi bi-heart-fill position-absolute p-2 heart"
              viewBox="0 -2 18 22"
          >
              <path
                  fill-rule="evenodd"
                  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
              />
          </svg>
          <div class="card-body">
              <p class="card-text truncate">${overview}</p>
              <div
                  class="
                      d-flex
                      justify-content-between
                      align-items-center
                  "
              >
                  <small class="text-muted">${releaseDate}</small>
              </div>
          </div>
      </div>
  `;

    const like = movieCard.querySelector('.heart') as SVGSVGElement;
    like.addEventListener('click', () => toggleLike(id));
    return movieCard;
};
export default createMovieCard;
