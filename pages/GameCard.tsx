import styles from "./GameCard.module.scss";
import { GameDetail } from "../types";

export function GameCard({ game }: { game: GameDetail }) {
  return (
    <div className={styles.GameCard}>
      <div className={styles.Banner}>
        <img className={styles.GameImage} src={game.header_image} />
        <div className={styles.TitleAndDev}>
          <h3 className={styles.GameName}>{game.name}</h3>
          <h4 className={styles.GameDeveloper}>{game.developers.join(",")}</h4>
        </div>
      </div>
      <div className={styles.Info}>
        <p className={styles.GameDescription}>{game.short_description}</p>
      </div>
    </div>
  );
}
