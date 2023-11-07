import { Router } from 'express';
import { createMovieValidation, deleteMovieValidation } from '../middlewares/requestValidation.js';
import { createMovie, getMovieByCurrentUser, deleteMovie } from '../controllers/movie.js';

const movieRoutes = Router();

movieRoutes.get('/movies', getMovieByCurrentUser);
movieRoutes.post('/movies', createMovieValidation, createMovie);
movieRoutes.delete('/movies/:_id', deleteMovieValidation, deleteMovie);

export default movieRoutes;
