import { Strategy } from 'passport-local';
import boom from '@hapi/boom';

import { UserServices } from '../../user/userService';

const userService = new UserServices();

export const LocalStrategy = new Strategy(
  { usernameField: '', passwordField: '' },
  async (username, password, done) => {
    try {
      const user = await userService.findByEmail(username);
      if (!user) {
        done(boom.unauthorized(), false);
      }
      if (user.password !== password) {
        done(boom.unauthorized(), false);
      }
      done(null, user);
    } catch (error) {
      done(error, false);
    };
  }
);
