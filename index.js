import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';

import { loginValidation, postCreateValidation, registerValidation } from './validations.js';
import * as UserController from './controllers/UserController.js';
import * as PostController from './controllers/PostController.js';

import checkAuth from './utils/checkAuth.js';

mongoose
  .connect('mongodb+srv://admin:wwwwww@cluster0.ejnrhts.mongodb.net/blog?retryWrites=true&w=majority')
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB error', err));

const app = express();
const PORT = process.env.PORT || 4444;
app.use(cors());

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads')
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname)
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use('/uploads', express.static('uploads'))

app.post('/auth/login', loginValidation, UserController.login);
app.post('/auth/register', registerValidation, UserController.register);
app.get('/auth/me', checkAuth, UserController.authUser);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  })
});

app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, PostController.update);



app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server OK');
});