import mongoose from 'mongoose';
import validator from 'validator';

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Страна создания фильма'],
  },
  director: {
    type: String,
    required: [true, 'Имя режиссера'],
  },
  duration: {
    type: Number,
    required: [true, 'Длительность фильма'],
  },
  year: {
    type: String,
    required: [true, 'Год выпуска фильма'],
  },
  description: {
    type: String,
    required: [true, 'Описание фильма'],
  },
  image: {
    type: String,
    required: [true, 'Ссылка на постер фильма'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL',
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'Ссылка на трейлер фильма'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL',
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Миниатюрное изображение постера к фильму'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: [true, 'Название фильма на русском языке'],
  },
  nameEN: {
    type: String,
    required: [true, 'Название фильма на английском языке'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { versionKey: false });

export default mongoose.model('movie', movieSchema);
