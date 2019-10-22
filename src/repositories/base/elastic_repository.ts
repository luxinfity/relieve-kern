import BaseRepository from './base_repository';
import { Context, Pagination, IObject } from '../../typings/common';
import { offset } from '../../utils/helpers';

type Context = Context | null;

export default class ElasticRepo<Model, ModelFillable> extends BaseRepository {
    protected index: string;

    public constructor(index: string, context?: Context) {
        super(context);
        this.index = index;
    }
}
