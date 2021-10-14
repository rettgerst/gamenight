import gamesJson from '../games.json';
import styles from './GameCard.module.scss';
import { GameDetail, SubGameData } from '../types';
import useMyVote from '../hooks/use-my-vote';
import { useCallback } from 'react';
import Image from 'next/image';
import Starburst from './Starburst';

export function GameCard({
	game,
	subGames,
	new: isNew
}: {
	game: GameDetail;
	subGames?: typeof gamesJson[0]['subGames'];
	new?: boolean;
}) {
	const { submitVote } = useMyVote();

	const clickHandler = useCallback((appId: number, subGameId?: number) => {
		submitVote(appId, subGameId);
		window.scroll({ top: 0, behavior: 'smooth' });
	}, []);

	return (
		<div className={styles.GameCard}>
			{isNew && (
				<Starburst className={styles.NewStarburst}>
					<p className={styles.StarburstText}>New!</p>
				</Starburst>
			)}
			<div
				className={styles.MainGameInfo}
				onClick={
					subGames ? undefined : () => clickHandler(game.steam_appid)
				}
			>
				<div className={styles.Banner}>
					<div className={styles.GameImage}>
						<Image
							objectFit="cover"
							layout="fill"
							src={game.header_image}
						/>
					</div>
					<div className={styles.TitleAndDev}>
						<h3 className={styles.GameName}>{game.name}</h3>
						<h4 className={styles.GameDeveloper}>
							{game.developers.join(', ')}
						</h4>
					</div>
				</div>
				<div className={styles.Info}>
					<p className={styles.GameDescription}>
						{game.short_description}
					</p>
				</div>
				<div className={styles.GameHoverContent}>
					{subGames ? (
						<div className={styles.PackDisclaimer}>
							<span className={styles.Text}>
								Choose one of the options below
							</span>
						</div>
					) : (
						<div
							onClick={() => clickHandler(game.steam_appid)}
							className={styles.VoteForGame}
						>
							<span className={styles.Text}>
								Vote for {game.name}
							</span>
						</div>
					)}
				</div>
			</div>
			{subGames ? (
				<div className={styles.SubGames}>
					{(subGames as SubGameData[]).map((sg, sgi) => (
						<div
							onClick={() => clickHandler(game.steam_appid, sgi)}
							key={sg.name}
							className={styles.SubGame}
						>
							{'image' in sg && sg.image && (
								<div className={styles.Image}>
									<Image
										objectFit="cover"
										layout="fill"
										src={sg.image}
									/>
								</div>
							)}
							<div className={styles.Info}>
								<p className={styles.SubGameDescription}>
									{sg.description}
								</p>
							</div>
							<div className={styles.SubGameHoverContent}>
								<div
									onClick={() =>
										clickHandler(game.steam_appid, sgi)
									}
									className={styles.VoteForGame}
								>
									<span className={styles.Text}>
										Vote for {sg.name}
									</span>
								</div>
							</div>
						</div>
					))}
				</div>
			) : null}
		</div>
	);
}
