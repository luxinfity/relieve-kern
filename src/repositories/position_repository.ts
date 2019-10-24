import MongoRepo from './base/mongo_repository';
import { Context } from '../typings/common';

export class PositionRepository extends MongoRepo<Position> {
    public constructor(context?: Context) {
        super('positions', context);
    }
}
