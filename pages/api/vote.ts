import { NextApiRequest, NextApiResponse } from 'next';
import { findOne, repoQuery } from '../../db/useDb';
import { Vote } from '../../entities/votes.entity';
import md5Hash from '../../functions/md5Hash';
import { MyVoteResponse, WinnerResponse } from '../../types';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

	if (typeof ip !== 'string')
		throw new Error(
			'Could not determine ip of client. IP address is used for vote uniqueness tracking.'
		);

	const userId = md5Hash(ip);

	if (req.method === 'POST') {
		const { gameId, subGameId } = JSON.parse(req.body);

		await repoQuery(Vote, async r => {
			const myVotes = await r.find({ userId });

			await r.removeAndFlush(myVotes);

			await r.persistAndFlush(new Vote(userId, gameId, subGameId));
		});

		res.status(200).end();
	} else if (req.method === 'GET') {
		const vote = await findOne(Vote, { userId });

		const response: MyVoteResponse = vote
			? {
					vote: { gameId: vote.gameId, subGameId: vote.subGameId },
					time: parseInt(vote.time)
			  }
			: { vote: null };

		res.status(200).json(response);
	} else {
		throw new Error('This endpoint only supports GET and POST');
	}
};
