import {
	HTMLAttributes,
	useCallback,
	useEffect,
	useMemo,
	useReducer
} from 'react';
import { voteLifespan } from '../constants';
import useMyVote from '../hooks/use-my-vote';
import RelativeTime from './RelativeTime';

export default function VoteExpiration({
	...transfer
}: HTMLAttributes<HTMLSpanElement>) {
	const { vote, submitVote } = useMyVote();

	const renew = useCallback(() => {
		if (!vote) return;
		submitVote(
			vote.game.steamInfo.steam_appid,
			!vote.subGame
				? undefined
				: vote.game.metadata.subGames.findIndex(
						sg => sg.name === vote.subGame?.name
				  )
		);
	}, [vote]);

	return (
		<div {...transfer}>
			{vote && (
				<>
					<p>
						Your vote expires in{' '}
						<RelativeTime time={vote!.time! + voteLifespan} />
					</p>
					<button type="button" onClick={renew}>
						Renew my vote
					</button>
				</>
			)}
		</div>
	);
}
