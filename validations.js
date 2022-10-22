import { body } from 'express-validator';

export const loginValidation = [
  body('email', 'Invalid email format').isEmail(),
  body('password', 'Mininum 5 symbols in password').isLength({ min: 5 }),
];

export const registerValidation = [
  body('email', 'Invalid email format').isEmail(),
  body('password', 'Mininum 5 symbols in password').isLength({ min: 5 }),
  body('fullName', 'Add your name').isLength({ min: 3 }),
  body('avatarUrl', 'Invalid url').optional().isURL(),
];

export const postCreateValidation = [
  body('title', 'Please, add title').isLength({ min: 3 }).isString(),
  body('text', 'please, add post').isLength({ min: 10 }).isString(),
  body('tags', 'Invalid tags format (add array)').optional().isString(),
  body('imageUrl', 'Invalid url').optional().isString(),
];