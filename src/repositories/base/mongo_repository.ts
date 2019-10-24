import BaseRepository from './base_repository';
import { Context, Pagination } from '../../typings/common';
import { offset } from '../../utils/helpers';

export default class MongoRepo<Model> extends BaseRepository {
    protected collection: string;

    public constructor(collection: string, context?: Context) {
        super(context);
        this.collection = collection;
    }
}
