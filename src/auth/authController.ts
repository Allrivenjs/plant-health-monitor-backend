import { Router } from 'express';

import jwt from 'jsonwebtoken';

import passport from 'passport';

export const authController = Router();

declare global {
  namespace Express {
    interface User {
      email: string;
    }
  }
}

// Create a user
authController.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;

      const payload = {
        sub: user.email,
      };

      const token = jwt.sign(payload, 'secret');

      res.json({
        user: req.user,
        token,
      });
    } catch (error) {
      next(error);
    }
  }
);
