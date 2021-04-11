import gamesJson from '../games.json';
import { useQuery } from 'react-query';
import { GameDetail, MyVoteResponse } from '../types';
import { useMemo } from 'react';

async function getMyVote(): Promise<MyVoteResponse> {
	const res = await fetch('/api/vote');
	if (res.ok) return res.json();
	else throw new Error(res.statusText);
}

export default function useMyVote(
	games: Record<
		string,
		{ steamInfo: GameDetail; metadata: typeof gamesJson[0] }
	>
) {
	const { data, ...others } = useQuery('my-vote', getMyVote, {
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

	return { vote: myVote, ...others };
}
