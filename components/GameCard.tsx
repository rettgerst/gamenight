import gamesJson from '../games.json';
import styles from './GameCard.module.scss';
import { GameDetail } from '../types';
import classNames from 'classnames';

export function GameCard({
	game,
	subGames,
	vote,
	myVote,
	mySubgameVote
}: {
	game: GameDetail;
	subGames?: typeof gamesJson[0]['subGames'];
	vote: (gameId: number, subGameId?: number) => void;
	myVote?: boolean;
	mySubgameVote?: string;
}) {
	return (
		<div
			className={classNames(styles.GameCard, {
				[styles.MyVote]: myVote
			})}
		>
			<div className={styles.MainGameInfo}>
				<div className={styles.Banner}>
					<img className={styles.GameImage} src={game.header_image} />
					<div className={styles.TitleAndDev}>
						<h3 className={styles.GameName}>{game.name}</h3>
						<h4 className={styles.GameDeveloper}>
							{game.developers.join(',')}
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
								This game is a pack, vote for one of the options
								below
							</span>
						</div>
					) : (
						<div
							onClick={() => vote(game.steam_appid)}
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
					{subGames.map((sg, sgi) => (
						<div
							key={sg.name}
							className={classNames(styles.SubGame, {
								[styles.MyVote]: mySubgameVote === sg.name
							})}
						>
							<h5 className={styles.SubGameName}>{sg.name}</h5>
							<p className={styles.SubGameDescription}>
								{sg.description}
							</p>
							<div className={styles.SubGameHoverContent}>
								<div
									onClick={() => vote(game.steam_appid, sgi)}
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
