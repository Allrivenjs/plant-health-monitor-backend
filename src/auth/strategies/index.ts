import passport from 'passport';

import { JwtStrategy } from './jwtStrategy';
import { LocalStrategy } from './localStrategy';

export const setupPassportStrategies = () => {
  passport.use(LocalStrategy);
  passport.use(JwtStrategy);
};
