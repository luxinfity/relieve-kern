import SQLRepo from './base/sql_repository';
import { Context } from 'src/typings/common';
import { Earthquake } from 'src/typings/models/earthquake';

export default class UserRepository extends SQLRepo<Earthquake> {
    public constructor(context?: Context) {
        super('Earthquake', context);
    }
}
