import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import BadRequest from '../errors/BadRequest.js';
import Conflict from '../errors/Conflict.js';

const { NODE_ENV, JWT_SECRET } = process.env;

const getInfoByCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.status(200).send({ name: user.name, email: user.email }))
    .catch(next);
};

const updateUserProfile = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      res.status(200).send({name: user.name, email: user.email});
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Ошибка валидации полей'));
      }
      return next;
    });
};

const createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => {
      res.status(201).send({
        email: user.email,
        _id: user._id,
        name: user.name,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new Conflict('Такой пользователь уже существует'));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Ошибка валидации полей'));
      }
      return next(err);
    });
};

const signin = (req, res, next) => {
  const {email, password} = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key', { expiresIn: '7d' });
      res.cookie('someCookieKey', token, { httpOnly: true, sameSite: true, maxAge: 3600000 * 24 * 7});
      res.status(200).send({ email: user.email});
    })
    .catch(next);
};

const signout = (req, res) => {
  res.clearCookie('someCookieKey');
  return res.send({});
};

export {
  createUser,
  updateUserProfile,
  signin,
  getInfoByCurrentUser,
  signout,
};
