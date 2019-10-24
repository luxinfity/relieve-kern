import BaseRepository from './base_repository';
import { Context, Pagination } from '../../typings/common';
import { offset } from '../../utils/helpers';
import { MongoCallback, InsertOneWriteOpResult, InsertWriteOpResult } from 'mongodb';

export default class MongoRepo<Model> extends BaseRepository {
    protected collection: string;

    public constructor(collection: string, context?: Context) {
        super(context);
        this.collection = collection;
    }

    public async findOne(condition: Partial<Model>): Promise<Model | undefined> {
        const db = await this.getMongoInstance();
        return db.collection(this.collection).findOne(condition);
    }

    public async findAll(condition: Partial<Model>): Promise<Model[]> {
        const db = await this.getMongoInstance();
        return db
            .collection(this.collection)
            .find(condition)
            .toArray();
    }

    public async createOne(payload: Partial<Model>): Promise<Model> {
        const db = await this.getMongoInstance();
        return db
            .collection(this.collection)
            .insertOne(payload)
            .then((res: InsertOneWriteOpResult<Model>): any => res.ops[0]);
    }

    public async createMany(payloads: Partial<Model>[]): Promise<Model[]> {
        const db = await this.getMongoInstance();
        return db
            .collection(this.collection)
            .insertMany(payloads)
            .then((res: InsertWriteOpResult<Model>): any => res.ops);
    }

    public async updateOne(condition: Partial<Model>, payload: Partial<Model>): Promise<void> {
        const db = await this.getMongoInstance();
        return db.collection(this.collection).updateOne(condition, { $set: payload });
    }

    public async updateMany(condition: Partial<Model>, payload: Partial<Model>): Promise<void> {
        const db = await this.getMongoInstance();
        return db.collection(this.collection).update(condition, { $set: payload });
    }

    public async upsert(condition: Partial<Model>, payload: Partial<Model>): Promise<void> {
        return this.findOne(condition).then(
            (res): Promise<any> => (res ? this.updateOne(condition, payload) : this.createOne(payload))
        );
    }
}
