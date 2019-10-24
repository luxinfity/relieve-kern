import BaseRepository from './base_repository';
import { Context, Pagination } from '../../typings/common';
import { offset } from '../../utils/helpers';

type IContext = Context | null;

export default class ElasticRepo<Model> extends BaseRepository {
    protected index: string;

    public constructor(index: string, context?: IContext) {
        super(context);
        this.index = index;
    }
}
