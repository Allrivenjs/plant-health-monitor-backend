import { Strategy } from 'passport-local';
import { UserServices } from '../../user/userService';
import boom from '@hapi/boom';

const userService = new UserServices();

export const LocalStrategy = new Strategy(async (email, password, done) => {
	try {
		const user = await userService.findByEmail(email);
		if (!user) {
			done(boom.unauthorized(), false);
		}
		if (user.password !== password) {
			done(boom.unauthorized(), false);
		}
		done(null, user);
	} catch (error) {
		done(error, false);
	}
});