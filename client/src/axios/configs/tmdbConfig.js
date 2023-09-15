const mediaType = {
    movie: "movie",
    tv: "tv"
}

const mediaCategory = {
    popular: 'popular',
    top_rate: 'top_rated'
}

const backdropSrc = (imgEndpoint) => `https://image.tmdb.org/t/p/original${imgEndpoint}`;
const posterSrc = (imgEndpoint) => imgEndpoint ?`https://image.tmdb.org/t/p/w500${imgEndpoint}`:'';
const trailerSrc = (videoId) => `https://www.youtube.com/embed/${videoId}`;

export default {
    mediaType,
    mediaCategory,
    backdropSrc,
    posterSrc,
    trailerSrc
}