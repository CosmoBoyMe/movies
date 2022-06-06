import { FC } from 'react';
import { IMovie } from '../../interfaces';
import './MovieCards.scss';

const MovieCard: FC<{ data: IMovie }> = ({ data }) => {
  const { overview, poster_path, title, vote_average } = data;
  return (
    <div className="movie-card">
      <div className="movie-card__img-wrapper">
        <img
          className="movie-card__img"
          src={`https://image.tmdb.org/t/p/original${poster_path}`}
          alt="movies poster"
        />
        <span className="movie-card__rate">{vote_average}</span>
        <p className="movie-card__text">{overview}</p>
      </div>
      <h2 className="movie-card__title">{title}</h2>
      <button className="movie-card__btn" type="button">
        Get more Info
      </button>
    </div>
  );
};

export { MovieCard };
