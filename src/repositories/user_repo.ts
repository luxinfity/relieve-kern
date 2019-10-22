import SQLRepo from './base/sql_repository';
import { Context } from 'src/typings/common';
import { User } from '../typings/models/user';

export default class UserRepository extends SQLRepo<User> {
    public constructor(context?: Context) {
        super('User', context);
    }
}
