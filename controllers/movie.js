import Movie from '../models/movie.js';
import Forbidden from '../errors/Forbidden.js';
import NotFound from '../errors/NotFound.js';
import BadRequest from '../errors/BadRequest.js';

const createMovie = ((req, res, next) => {
  const {
    country, director, duration, year,
    description, image, trailerLink, nameRU,
    nameEN, thumbnail, movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.status(201).send(movie))
    .catch(next);
});

const getMovieByCurrentUser = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((data) => res.send(data))
    .catch(next);
};

const deleteMovie = ((req, res, next) => {
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        return next(new NotFound('Фильм с указанным id не найден'));
      }
      if (movie.owner.valueOf() !== req.user._id) {
        return next(new Forbidden('Нет прав для удаления чужой фильма'));
      }
      Movie.findByIdAndDelete(req.params._id)
        .then((item) => res.status(200).send(item))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest('Передан невалидный id фильма'));
      }
      return next;
    });
});

export {
  createMovie, getMovieByCurrentUser, deleteMovie,
};
