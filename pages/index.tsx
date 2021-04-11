import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import head from "next/head";

import ownedGames from "../games.json";

import styles from "./index.module.scss";

import SteamAPI from "steamapi";
import { GameDetail } from "../types";

export async function getStaticProps(ctx: GetStaticPropsContext) {
  const { STEAM_WEB_KEY } = process.env;

  if (!STEAM_WEB_KEY)
    throw new Error("Please add a STEAM_WEB_KEY environment variable");

  const steam = new SteamAPI(STEAM_WEB_KEY);

  const gameDetails = await await Promise.all(
    ownedGames.map((game) => steam.getGameDetails(game) as Promise<GameDetail>)
  );

  const games = gameDetails
    .map((g) => g)
    .reduce(
      (map, game) => ({ ...map, [game.steam_appid]: game }),
      {} as { [key: string]: GameDetail }
    );

  return { props: { games } };
}

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>;

function GameCard({ game }: { game: GameDetail }) {
  return (
    <div className={styles.GameCard}>
      <img className={styles.GameImage} src={game.header_image} />
      <span className={styles.GameName}>{game.name}</span>
    </div>
  );
}

export default function Home({ games }: HomeProps) {
  return (
    <>
      <div className={styles.Content}>
        <img className={styles.Header} src="https://i.imgur.com/D00VVbQ.png" />
        <h2>
          <i>Hosted by @nullhund</i>
        </h2>
        <h2 style={{ color: "red" }}>This page is a work in progress!</h2>
        <h2>Game Menu</h2>
        <ul className={styles.GameList}>
          {Object.entries(games).map(([appId, gameData]) => (
            <li key={appId}>
              <GameCard game={gameData} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
