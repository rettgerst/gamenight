import { voteLifespan } from '../constants';
import { repoQuery } from '../db/useDb';
import { Vote } from '../entities/votes.entity';

export default async function cullOldVotes() {
	const now = Date.now();

	// not very efficient but this is a small hobby app with maybe a dozen concurrent users so it should be fine in practice
	await repoQuery(Vote, async repo => {
		const votes = await repo.findAll();

		const oldVotes = votes.filter(vote => {
			const time = parseInt(vote.time);

			return time < now - voteLifespan;
		});

		await repo.removeAndFlush(oldVotes);
	});
}
