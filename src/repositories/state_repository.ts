import MongoRepo from './base/mongo_repository';
import { Context } from '../typings/common';
import { State } from '../typings/state';

export default class StateRepository extends MongoRepo<State> {
    public constructor(context?: Context) {
        super('states', context);
    }

    public async getInRadius(coordinates: number[], radius: number): Promise<State[]> {
        const db = await this.getMongoInstance();
        return db.collection(this.collection).find({
            geograph: {
                $near: {
                    $geometry: { type: 'Point', coordinates },
                    $maxDistance: radius
                }
            }
        });
    }
}
