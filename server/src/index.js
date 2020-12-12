import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';

import config from './config';

import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

import { findOrCreateUser } from './controllers/user.controller';

// Connect DB
mongoose
	.connect(config.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	})
	.then(() => console.log(`Connected to MongoDB.`))
	.catch(err => console.error(err));

// Apollo Server
const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: async ({ req }) => {
		let authToken = null;
		let currentUser = null;
		try {
			authToken =
				req && req.headers && req.headers.authorization
					? req.headers.authorization
					: null;
			if (authToken) {
				// Find user in db or create a new user
				currentUser = await findOrCreateUser(authToken);
			}
		} catch (err) {
			console.error(err);
			console.error(
				`Unable to authenticate user with token ${authToken}`
			);
		}

		return { currentUser };
	}
});

server.listen({ port: config.PORT }).then(({ url }) => {
	console.log(
		`Server is running at ${url} in ${config.NODE_ENV.toUpperCase()} mode.`
	);
});
