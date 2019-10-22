import BaseRepository from './base_repository';
import { Context, Pagination, IObject } from '../../typings/common';
import { offset } from '../../utils/helpers';

type Context = Context | null;

export default class MongoRepo<Model, ModelFillable> extends BaseRepository {
    protected collection: string;

    public constructor(collection: string, context?: Context) {
        super(context);
        this.collection = collection;
    }
}
