import React from 'react';
import ownedGames from '../games.json';
import { GameDetail, SubGameData } from '../types';

interface VoteContextInterface {
	games: {
		[key: string]: {
			steamInfo: GameDetail;
			metadata: {
				appId: string;
				subGames: SubGameData[];
			};
		};
	};
}

const VoteContext = React.createContext<VoteContextInterface>(undefined as any);

export default VoteContext;
