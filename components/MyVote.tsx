import React, { useEffect, useMemo, useReducer } from 'react';
import { voteLifespan } from '../constants';
import useMyVote from '../hooks/use-my-vote';
import useWinner from '../hooks/use-winner';
import EmptyCard from './EmptyCard';
import VoteCard from './VoteCard';

export default function MyVote() {
	const { vote } = useMyVote();

	const { refetch: refetchWinner } = useWinner();

	const imageSrc = useMemo(() => {
		if (!vote) return null;
		else {
			const { game, subGame } = vote;

			if (!subGame) {
				return game.steamInfo.header_image;
			} else {
				return subGame.image;
			}
		}
	}, [vote]);

	const gameTitle = useMemo(() => {
		if (!vote) return 'None';
		else {
			const { game, subGame } = vote;

			if (!subGame) {
				return game.steamInfo.name;
			} else {
				return subGame.name;
			}
		}
	}, [vote]);

	return (
		<>
			{vote ? (
				<VoteCard
					title="Your Vote"
					image={imageSrc || ''}
					gameName={gameTitle}
				/>
			) : (
				<EmptyCard content="Click your favorite game!" />
			)}
		</>
	);
}
