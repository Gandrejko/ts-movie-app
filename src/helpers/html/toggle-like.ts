import { updateLS } from '../local-storage';
import { likedMoviesID, setLikedMoviesID } from '../states';

const toggleLike = (id: number) => {
    const likes: NodeListOf<SVGSVGElement> = document.querySelectorAll(`[data-id="${id}"]`);

    likes.forEach((like) => {
        const currentLikeValue = like.dataset.like as string;
        const parsedLikeValue = JSON.parse(currentLikeValue);
        const newLikeValue = (!parsedLikeValue).toString();
        like?.setAttribute('data-like', newLikeValue);
        const isLiked = JSON.parse(like.dataset.like as string);
        like.setAttribute('fill', isLiked ? 'red' : '#ff000078');
    });

    const newLikedMoviesID = likedMoviesID().includes(id)
        ? likedMoviesID().filter((movieId) => movieId !== id)
        : [...likedMoviesID(), id];
    setLikedMoviesID(newLikedMoviesID);
    updateLS(likedMoviesID());
};

export default toggleLike;
