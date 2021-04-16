import { Vote } from '../entities/votes.entity';
import countVotes from './countVotes';

test('overwhelming among us victory', () => {
	const votes: Vote[] = [];

	for (let index = 0; index < 10; index++) {
		votes.push({
			id: index,
			userId: index.toString(),
			gameId: 945360,
			time: undefined as any
		});
	}
	const winner = countVotes(votes);

	expect(winner).toMatchInlineSnapshot(`
		Object {
		  "winner": Object {
		    "gameId": 945360,
		    "subGameId": undefined,
		  },
		}
	`);
});

test('which trivia murder party to play?', () => {
	const votes: Vote[] = [
		{
			gameId: 945360,
			subGameId: 1,
			id: undefined as any,
			userId: undefined as any,
			time: undefined as any
		},
		{
			gameId: 945360,
			subGameId: 1,
			id: undefined as any,
			userId: undefined as any,
			time: undefined as any
		},
		{
			gameId: 1005300,
			subGameId: 0,
			id: undefined as any,
			userId: undefined as any,
			time: undefined as any
		},
		{
			gameId: 1005300,
			subGameId: 0,
			id: undefined as any,
			userId: undefined as any,
			time: undefined as any
		},
		{
			gameId: 1005300,
			subGameId: 0,
			id: undefined as any,
			userId: undefined as any,
			time: undefined as any
		},
		{
			gameId: 945360,
			subGameId: 1,
			id: undefined as any,
			userId: undefined as any,
			time: undefined as any
		},
		{
			gameId: 1005300,
			subGameId: 0,
			id: undefined as any,
			userId: undefined as any,
			time: undefined as any
		}
	];

	const winner = countVotes(votes);

	expect(winner).toMatchInlineSnapshot(`
		Object {
		  "winner": Object {
		    "gameId": 1005300,
		    "subGameId": 0,
		  },
		}
	`);
});
