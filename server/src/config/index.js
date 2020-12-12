import dotenv from 'dotenv-safe';
import path from 'path';

/**
 * Wrap variables in a better way:
 * - Default values to prevent adhoc failure
 * - Use this object for intellisense
 */
dotenv.config({
	path: path.join(__dirname, `../../.env`),
	example: path.join(__dirname, `../../.env.example`)
});

const config = {
	NODE_ENV: process.env.NODE_ENV || 'development',
	PORT: parseInt(process.env.PORT) || 4000,
	MONGO_URI:
		process.env.NODE_ENV === 'production'
			? process.env.MONGO_URI
			: process.env.MONGO_URI_DEV,
	OAUTH_CLIENT_ID: process.env.OAUTH_CLIENT_ID || ''
};

export default config;
