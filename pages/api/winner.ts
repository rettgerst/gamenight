import { NextApiRequest, NextApiResponse } from 'next';
import getWinner from '../../functions/getWinner';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'GET') throw new Error('This method only supports GET');

	const response = await getWinner();

	res.status(200).json(response);
};
