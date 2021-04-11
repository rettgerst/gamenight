import ormconfig from '../orm.config';

import {
	EntityName,
	EntityRepository,
	FilterQuery,
	Loaded,
	MikroORM,
	Populate,
	QueryOrderMap
} from '@mikro-orm/core';

import {
	FindOptions,
	FindOneOptions
} from '@mikro-orm/core/drivers/IDatabaseDriver';

export async function repoQuery<T, R>(
	entity: EntityName<T>,
	query: (repo: EntityRepository<T>) => Promise<R>
): Promise<R> {
	const queryStart = Date.now();
	const orm = await MikroORM.init(ormconfig);

	const repository = orm.em.getRepository(entity);

	const response = await query(repository);

	await orm.close();

	return response;
}

export async function findAll<T, P extends Populate<T>>(
	entity: EntityName<T>,
	options?: FindOptions<T, P>
) {
	return repoQuery(entity, r => r.findAll(options));
}

export async function findOne<T, P extends Populate<T>>(
	entity: EntityName<T>,
	where: FilterQuery<T>,
	options?: FindOneOptions<T, P>,
	orderBy?: QueryOrderMap
) {
	return repoQuery(entity, r => r.findOne(where, options, orderBy));
}

export async function mutate<T>(
	entity: EntityName<T>,
	instance: T,
	mutator: (ent: T) => void
) {
	return repoQuery(entity, async r => {
		mutator(instance);
		await r.persistAndFlush(instance);
	});
}

export async function findOneAndPersist<T, P extends Populate<T>>(
	entity: EntityName<T>,
	where: FilterQuery<T>,
	options: FindOneOptions<T, P> | undefined,
	orderBy: QueryOrderMap | undefined,
	mutate: (instance: Loaded<T, P> | null) => T
): Promise<void> {
	return repoQuery(entity, async r => {
		const instance = await r.findOne(where, options, orderBy);

		const mutated = mutate(instance as Loaded<T, P> | null);

		await r.persistAndFlush(mutated);
	});
}
