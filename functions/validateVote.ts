import games from "../games.json";

export default function validateVote(appId: number, subGameId?: number) {
  const game = games.find((g) => +g.appId === appId);

  if (!game) throw new Error(`No game with app id ${appId}`);

  if (subGameId !== undefined) {
    const subgame = game.subGames?.[subGameId];

    if (!subgame) throw new Error(`Game has no subgame at index ${subGameId}`);
  } else {
    if (game.subGames) throw new Error("Game is a pack and needs a subgame id");
  }
}
