import * as crypto from 'crypto';

export default function md5Hash(input: string) {
	return crypto.createHash('md5').update(input).digest('hex');
}
