import { Router } from 'express';

import jwt from 'jsonwebtoken';

import passport from 'passport';

import { config } from '../config';
import { registerUserSchema } from './authSchema';
import { validatorHandler } from '../middlewares';
import { User } from '../entity';
import { UserServices } from '../user/userService';

const userService = new UserServices();

export const authController = Router();

declare global {
  namespace Express {
    interface User {
      email: string;
    }
  }
}

// login a user
authController.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;

      const payload = {
        sub: user.email,
      };

      const token = jwt.sign(payload, config.secret);

      res.json({
        user: req.user,
        token,
      });
    } catch (error) {
      next(error);
    }
  }
);

// register a user
authController.post(
  '/register',
  validatorHandler(registerUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { email, password, name } = req.body;

      const newUser = new User();
      newUser.name = name;
      newUser.email = email;
      newUser.password = password;

      await userService.createUser(newUser);

      const payload = {
        sub: newUser.email,
      };

      const token = jwt.sign(payload, config.secret);

      res.json({
        user: req.body,
        token,
      });
    } catch (error) {
      next(error);
    }
  }
);

authController.get(
  '/verify',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const user = await userService.findByEmail(req.user.email);

      res.json({
        user: user,
      });
    } catch (error) {
      next(error);
    }
  }
);
