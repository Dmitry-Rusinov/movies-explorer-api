import { Router } from 'express';

import { createMovie, getMovieByCurrentUser, deleteMovie } from '../controllers/movie.js';

const movieRoutes = Router();

movieRoutes.get('/movies', getMovieByCurrentUser);
movieRoutes.post('/movies', /* createCardValidation, */ createMovie);
movieRoutes.delete('/movies/:_id', /* deleteCardValidation, */ deleteMovie);

export default movieRoutes;
