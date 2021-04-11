import { Options, ConnectionOptions } from '@mikro-orm/core';
import { Vote } from './entities/votes.entity';

import dotenv from 'dotenv';

let connection: ConnectionOptions;

const { VERCEL } = process.env;

const entities = [Vote];

const appname = 'gamenight';

if (VERCEL) {
	const { VERCEL_GIT_COMMIT_REF: branch, VERCEL_ENV: stage } = process.env;

	const { DB_HOST: host, DB_USER: user, DB_PASSWORD: password } = process.env;

	const { DB_PORT = '5432' } = process.env;

	const port = parseInt(DB_PORT);

	let dbName: string;
	if (stage === 'production') dbName = `${appname}-production`;
	else if (stage === 'preview') dbName = `${appname}-preview-${branch}`;
	else if (stage === 'development') dbName = `${appname}-dev-${branch}`;
	else throw new Error(`Unrecognized vercel deployment stage ${stage}`);

	connection = { host, port, user, password, dbName };
} else {
	dotenv.config({ path: '.env.local' });
	const { DB_USER, DB_PASSWORD } = process.env;
	connection = {
		host: 'localhost',
		dbName: `${appname}-local`,
		user: DB_USER,
		password: DB_PASSWORD
	};
}

const config: Options = {
	type: 'postgresql',
	entities,
	discovery: {
		disableDynamicFileAccess: true
	},
	...connection,
	baseDir: process.cwd(),
	migrations: {
		path: './migrations',
		dropTables: true,
		disableForeignKeys: false
	}
};

export default config;
export { connection };
