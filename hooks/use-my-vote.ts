import gamesJson from '../games.json';
import { useQuery } from 'react-query';
import { MyVoteResponse } from '../types';
import { useCallback, useContext, useEffect, useMemo, useReducer } from 'react';
import VoteContext from '../contexts/VoteContext';
import useWinner from './use-winner';
import { voteLifespan } from '../constants';
import vote from '../pages/api/vote';

async function getMyVote(): Promise<MyVoteResponse> {
	const res = await fetch('/api/vote');
	if (res.ok) return res.json();
	else throw new Error(res.statusText);
}

export default function useMyVote() {
	const { games } = useContext(VoteContext);

	const { refetch: refetchWinner } = useWinner();

	const { data, refetch, ...others } = useQuery('my-vote', getMyVote, {
		refetchInterval: 5 * 1000
	});

	const myVote = useMemo(() => {
		if (!data) return null;
		const { vote, time } = data;
		if (!vote) return null;
		else {
			const game = games[vote.gameId];
			const gameJsonData = gamesJson.find(g => +g.appId === vote.gameId);
			const subGame =
				vote.subGameId !== undefined
					? gameJsonData?.subGames?.[vote.subGameId]
					: null;

			return { game, subGame, time };
		}
	}, [data]);

	const [, forceUpdate] = useReducer(x => x + 1, 0);

	const voteIsActive =
		myVote && myVote.time && myVote.time + voteLifespan > Date.now();

	useEffect(() => {
		if (myVote && myVote.time) {
			const timeout = setTimeout(
				() => forceUpdate(),
				myVote.time + voteLifespan - Date.now()
			);
			return () => clearTimeout(timeout);
		}
	}, [myVote]);

	const submitVote = useCallback((gameId: number, subGameId?: number) => {
		fetch('/api/vote', {
			method: 'POST',
			body: JSON.stringify({ gameId, subGameId })
		}).then(res => {
			if (res.ok) {
				refetch();
				refetchWinner();
			}
		});
	}, []);

	return {
		vote: voteIsActive ? myVote : null,
		refetch,
		submitVote,
		...others
	};
}
