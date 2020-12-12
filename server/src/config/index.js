import path from 'path';

/**
 * Wrap variables in a better way:
 * - Default values to prevent adhoc failure
 * - Use this object for intellisense
 * Update 2020/12/12: Conditionally require dotenv-safe
 * to avoid errors in heroku
 */
if (process.env.NODE_ENV !== 'production') {
	require('dotenv-safe').config({
		path: path.join(__dirname, `../../.env`),
		example: path.join(__dirname, `../../.env.example`)
	});
}

const config = {
	NODE_ENV: process.env.NODE_ENV || 'development',
	MONGO_URI: process.env.MONGO_URI,
	PORT: parseInt(process.env.PORT) || 4000,
	OAUTH_CLIENT_ID: process.env.OAUTH_CLIENT_ID || ''
};

export default config;
