import axios, { AxiosRequestConfig } from "axios";

// Constants
import { apiKey } from "../constants";

// Endpoints
const apiBaseUrl: string = "https://api.themoviedb.org/3";
const trendingMoviesEndpoint: string = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`;
const upcomingMoviesEndpoint: string = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`;
const topRatedMoviesEndpoint: string = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`;

// Dynamic Endpoints
const movieDetailsEndpoints = (id: number): string =>
  `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`;
const movieCreditsEndpoints = (id: number): string =>
  `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`;
const similarMovieEndpoints = (id: number): string =>
  `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`;
const searchMovieEndpoint: string = `${apiBaseUrl}/search/movie?api_key=${apiKey}`;
const personDetailsEndpoint = (id: number): string =>
  `${apiBaseUrl}/person/${id}?api_key=${apiKey}`;
const personMoviesDetailsEndpoint = (id: number): string =>
  `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`;

// Image URLs
export const image500 = (path: string | null): string | null =>
  path ? `https://image.tmdb.org/t/p/original${path}` : null;
export const image342 = (path: string | null): string | null =>
  path ? `https://image.tmdb.org/t/p/w342${path}` : null;
export const image185 = (path: string | null): string | null =>
  path ? `https://image.tmdb.org/t/p/w185${path}` : null;

export const avatar: string = "https://www.svgrepo.com/show/442075/avatar-default-symbolic.svg";

// API Call Function
const apiCall = async ({ endpoint, params }: { endpoint: string; params?: any }) => {
  const options: AxiosRequestConfig = {
    method: "GET",
    url: endpoint,
    params: params ? params : {},
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Exported Functions
export const fetchTrendingMovies = () => {
  return apiCall({ endpoint: trendingMoviesEndpoint });
};

export const fetchUpcomingMovies = () => {
  return apiCall({ endpoint: upcomingMoviesEndpoint });
};

export const fetchTopRatedMovies = () => {
  return apiCall({ endpoint: topRatedMoviesEndpoint });
};

export const fetchMovieDetails = (id: number) => {
  return apiCall({ endpoint: movieDetailsEndpoints(id) });
};

export const fetchMovieCredits = (id: number) => {
  return apiCall({ endpoint: movieCreditsEndpoints(id) });
};

export const fetchSimilarDetails = (id: number) => {
  return apiCall({ endpoint: similarMovieEndpoints(id) });
};

export const fetchPersonDetails = (id: number) => {
  return apiCall({ endpoint: personDetailsEndpoint(id) });
};

export const fetchPersonMovies = (id: number) => {
  return apiCall({ endpoint: personMoviesDetailsEndpoint(id) });
};

export const searchMovies = (query: string) => {
  return apiCall({ endpoint: searchMovieEndpoint, params: { query } });
};
