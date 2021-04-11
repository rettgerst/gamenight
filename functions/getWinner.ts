import { findAll } from '../db/useDb';
import { Vote } from '../entities/votes.entity';
import { WinnerResponse } from '../types';
import cullOldVotes from './cullOldVotes';

function voteKey(vote: Vote): string {
	const { gameId, subGameId } = vote;
	const tokens = [gameId];

	if (subGameId !== null && subGameId !== undefined) tokens.push(subGameId);

	return tokens.join('-');
}

export default async function getWinner(): Promise<WinnerResponse> {
	await cullOldVotes();

	const votes = await findAll(Vote);

	if (votes.length === 0) return { winner: null };

	const tally = votes.reduce((t, vote) => {
		const key = voteKey(vote);

		if (!t[key]) t[key] = 0;

		t[key]++;

		return t;
	}, {} as Record<string, number>);

	const [winnerId, winnerSubGameId] = Object.entries(tally)
		.sort(([, a], [, b]) => b - a)[0][0]
		.split('-');

	return {
		winner: {
			gameId: +winnerId,
			subGameId:
				winnerSubGameId !== undefined ? +winnerSubGameId : undefined
		}
	};
}
