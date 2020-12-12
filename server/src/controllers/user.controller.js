import User from '../models/User';
import { OAuth2Client } from 'google-auth-library';
import config from '../config';

const client = new OAuth2Client(config.OAUTH_CLIENT_ID);

const verifyAuthToken = async token => {
	try {
		const ticket = await client.verifyIdToken({
			idToken: token,
			audience: config.OAUTH_CLIENT_ID
		});
		return ticket.getPayload();
	} catch (err) {
		console.error(err);
	}
};

const checkIfUserExists = async email => {
	return await User.findOne({ email }).exec();
};

const createNewUser = googleUser => {
	const { name, email, picture } = googleUser;
	const user = { name, email, picture };
	return new User(user).save();
};

export const findOrCreateUser = async token => {
	// Verify auth token
	const googleUser = await verifyAuthToken(token);
	// Check if user exists
	const user = await checkIfUserExists(googleUser.email);
	// console.log(`user exists: ${user}`);
	// If yes, return them, else create new user in db
	return user ? user : createNewUser(googleUser);
};
