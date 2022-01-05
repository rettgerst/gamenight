import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Image from 'next/image';

import ownedGames from '../games.json';

import styles from './index.module.scss';

import SteamAPI from 'steamapi';
import { GameDescriptor, GameDetail } from '../types';
import { GameCard } from '../components/GameCard';
import useWinner from '../hooks/use-winner';
import { useCallback, useMemo } from 'react';
import useMyVote from '../hooks/use-my-vote';
import RelativeTime from '../components/RelativeTime';
import { voteLifespan } from '../constents';

export async function getStaticProps(ctx: GetStaticPropsContext) {
	const { STEAM_WEB_KEY } = process.env;

	if (!STEAM_WEB_KEY)
		throw new Error('Please add a STEAM_WEB_KEY environment variable');

	const steam = new SteamAPI(STEAM_WEB_KEY);

	const gameDetails = await await Promise.all(
		ownedGames.map(metadata =>
			(steam.getGameDetails(metadata.appId) as Promise<GameDetail>).then(
				steamInfo => ({
					steamInfo,
					metadata
				})
			)
		)
	);

	const games = gameDetails.reduce(
		(map, game) => ({ ...map, [game.steamInfo.steam_appid]: game }),
		{} as {
			[key: string]: {
				steamInfo: GameDetail;
				metadata: typeof ownedGames[0];
			};
		}
	);

	return { props: { games } };
}

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>;

function hasSubgame(input: GameDescriptor): boolean {
	return (
		'subGameId' in input &&
		input.subGameId !== null &&
		input.subGameId !== undefined
	);
}

export default function Home({ games }: HomeProps) {
	const { winner, refetch: refetchWinner } = useWinner(games);

	const { vote, refetch: refetchMyVote } = useMyVote(games);

	const submitVote = useCallback((gameId: number, subGameId?: number) => {
		fetch('/api/vote', {
			method: 'POST',
			body: JSON.stringify({ gameId, subGameId })
		}).then(res => {
			if (res.ok) {
				refetchWinner();
				refetchMyVote();
			}
		});
	}, []);

	return (
		<>
			<div className={styles.Content}>
				<h1 className={styles.Header}>Party Game Night!</h1>
				{winner && (
					<>
						<h2>Winner of current vote:</h2>
						<p>
							{winner.game.steamInfo.name}
							{'subGame' in winner &&
							winner.subGame !== undefined &&
							winner.subGame !== null
								? `: ${winner.subGame!.name}`
								: ''}
						</p>
					</>
				)}
				{vote && (
					<>
						<h2>You voted for:</h2>
						<p>
							{vote.game.steamInfo.name}
							{'subGame' in vote &&
							vote.subGame !== undefined &&
							vote.subGame !== null
								? `: ${vote.subGame!.name}`
								: ''}
						</p>
						{vote.time && (
							<>
								<p>
									Your vote expires in{' '}
									<RelativeTime
										time={vote.time + voteLifespan}
									/>
								</p>
							</>
						)}
					</>
				)}
				<h2 className={styles.AvailableGames}>Available Games</h2>
				<div className={styles.GameList}>
					{Object.entries(games).map(([appId, gameData]) => (
						<GameCard
							myVote={vote?.game.steamInfo.steam_appid === +appId}
							mySubgameVote={vote?.subGame?.name}
							vote={submitVote}
							key={appId}
							game={gameData.steamInfo}
							subGames={gameData.metadata.subGames}
						/>
					))}
				</div>
				<div className={styles.Footer}>
					<span>
						Built with{' '}
						<a href="https://nextjs.org">
							<img
								className={styles.FooterLogo}
								src="/nextjs.png"
							/>
						</a>
					</span>
					<span>
						Hosted on{' '}
						<a href="https://vercel.app">
							<img
								className={styles.FooterLogo}
								src="/vercel.png"
							/>
						</a>
					</span>
					<span>
						Data from{' '}
						<a href="https://store.steampowered.com">
							<img
								className={`${styles.FooterLogo} ${styles.Invert}`}
								src="/steam.png"
							/>
						</a>
					</span>
				</div>
			</div>
		</>
	);
}
