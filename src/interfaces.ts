interface IMovie {
  id: number;
  overview: string;
  poster_path: string;
  title: string;
  release_date: string;
  vote_average: number;
}

interface IMoviesResponseData {
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export type { IMoviesResponseData, IMovie };
