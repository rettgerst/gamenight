import gamesJson from '../games.json';
import styles from './GameCard.module.scss';
import { GameDetail, SubGameData } from '../types';
import classNames from 'classnames';
import useMyVote from '../hooks/use-my-vote';

export function GameCard({
	game,
	subGames
}: {
	game: GameDetail;
	subGames?: typeof gamesJson[0]['subGames'];
}) {
	const { vote, submitVote } = useMyVote();
	return (
		<div
			className={classNames(styles.GameCard, {
				[styles.MyVote]:
					vote?.game.steamInfo.steam_appid === game.steam_appid
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
								Choose one of the options below
							</span>
						</div>
					) : (
						<div
							onClick={() => submitVote(game.steam_appid)}
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
							key={sg.name}
							className={classNames(styles.SubGame, {
								[styles.MyVote]: vote?.subGame?.name === sg.name
							})}
						>
							{'image' in sg && (
								<div className={styles.Image}>
									<img
										style={{
											objectPosition:
												sg.imageObjectPosition
										}}
										src={sg.image!}
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
										submitVote(game.steam_appid, sgi)
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
