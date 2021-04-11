import gamesJson from '../games.json';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { GameDetail, WinnerResponse } from '../types';

async function getWinner(): Promise<WinnerResponse> {
	const res = await fetch('/api/winner');
	if (res.ok) return res.json();
	else throw new Error(res.statusText);
}

export default function useWinner(
	games: Record<
		string,
		{ steamInfo: GameDetail; metadata: typeof gamesJson[0] }
	>
) {
	const { data, ...others } = useQuery('winner', getWinner, {
		refetchInterval: 5 * 1000
	});

	const currentWinner = useMemo(() => {
		if (!data) return null;
		const { winner } = data;
		if (!winner) return null;
		else {
			const game = games[winner.gameId];
			const gameJsonData = gamesJson.find(
				g => +g.appId === winner.gameId
			);
			const subGame =
				winner.subGameId !== undefined
					? gameJsonData?.subGames?.[winner.subGameId]
					: null;

			return { game, subGame };
		}
	}, [data]);

	return { winner: currentWinner, ...others };
}
