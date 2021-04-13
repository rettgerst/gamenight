import { useMemo } from 'react';
import useWinner from '../hooks/use-winner';
import EmptyCard from './EmptyCard';
import VoteCard from './VoteCard';
import styles from './Winner.module.scss';

export default function Winner() {
	const { winner } = useWinner();

	const imageSrc = useMemo(() => {
		if (!winner) return null;
		else {
			const { game, subGame } = winner;

			if (!subGame) {
				return game.steamInfo.header_image;
			} else {
				return subGame.image;
			}
		}
	}, [winner]);

	const gameTitle = useMemo(() => {
		if (!winner) return 'None';
		else {
			const { game, subGame } = winner;

			if (!subGame) {
				return game.steamInfo.name;
			} else {
				return subGame.name;
			}
		}
	}, [winner]);

	return (
		<>
			{winner ? (
				<VoteCard
					title={'Winner'}
					gameName={gameTitle}
					image={imageSrc || ''}
				/>
			) : (
				<EmptyCard content="No active vote!" />
			)}
		</>
	);
}
