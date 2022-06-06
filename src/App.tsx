import axios from 'axios';
import { FormEvent, useEffect, useState } from 'react';
import './App.scss';
import { MovieCard } from './components/MovieCard/MovieCard';
import { SearchForm } from './components/SearchForm/SearchForm';
import { IMoviesResponseData, IMovie } from './interfaces';

function App() {
  const [movies, setMovies] = useState<IMovie[]>([]);

  const setNowPlayingMovies = async () => {
    const { data } = await axios.get<IMoviesResponseData>(
      'https://api.themoviedb.org/3/movie/now_playing?api_key=4c6dd63f596a8319e537a11abe7aa493'
    );
    setMovies(data.results);
  };

  useEffect(() => {
    setNowPlayingMovies();
  }, []);

  const setSearchedMovies = async (value: string) => {
    const { data } = await axios.get<IMoviesResponseData>(
      `https://api.themoviedb.org/3/search/movie?api_key=4c6dd63f596a8319e537a11abe7aa493&language=en-US&page=1&query=${value}`
    );
    setMovies(data.results);
  };

  const handlerFormSubmit = (
    event: FormEvent<HTMLFormElement>,
    value: string
  ) => {
    event.preventDefault();
    setSearchedMovies(value);
  };

  return (
    <div className="movies">
      <div className="movies__container">
        <div className="movies__search-form">
          <SearchForm handlerFormSubmit={handlerFormSubmit} />
        </div>
        <ul className="movies__cards-list">
          {movies.map((movie: IMovie) => {
            return (
              <li key={movie.id} className="movies__cards-item">
                <MovieCard data={movie} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
