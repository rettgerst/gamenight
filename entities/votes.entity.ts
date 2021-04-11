import { Entity, PrimaryKey, Property, TimeType } from '@mikro-orm/core';
import validateVote from '../functions/validateVote';

@Entity()
export class Vote {
	@PrimaryKey()
	id!: number;

	@Property()
	gameId!: number;

	@Property({ nullable: true })
	subGameId?: number;

	@Property()
	userId: string;

	@Property()
	time: string;

	constructor(userId: string, gameId: number, subGameId?: number) {
		validateVote(gameId, subGameId);

		this.userId = userId;
		this.gameId = gameId;
		this.subGameId = subGameId;
		this.time = Date.now().toString();
	}
}
