import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';

// const { config } = require('../../../config/config');

const options: StrategyOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: 'secret',
};

export const JwtStrategy = new Strategy(options, (payload, done) => {
	return done(null, payload);
});
