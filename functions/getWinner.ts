import { findAll } from '../db/useDb';
import { Vote } from '../entities/votes.entity';
import { WinnerResponse } from '../types';
import countVotes from './countVotes';
import cullOldVotes from './cullOldVotes';

export default async function getWinner(): Promise<WinnerResponse> {
	await cullOldVotes();

	const votes = await findAll(Vote);

	return countVotes(votes);
}
