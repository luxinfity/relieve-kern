import { HttpError } from 'tymon';

import { IContext, IData, IHandlerOutput } from 'src/typings/common';
import AuthMiddleware from '../middlewares/firebase-auth';
import UserRepository from '../repositories/user_repo';
import BaseController from './base/base_controller';

export default class ProfileController extends BaseController {
    public constructor() {
        super();
        this.setMiddleware(AuthMiddleware);
    }

    public async getProfile(data: IData, context: IContext): Promise<IHandlerOutput> {
        try {
            // logic

            return {
                message: 'profile data retrieved',
                data: context
            };
        } catch (err) {
            if (err.status) throw err;
            throw HttpError.InternalServerError(err.message);
        }
    }

    protected setRoutes(): void {
        this.addRoute('get', '/', this.getProfile);

        /** nested controllers */
        // this.addChildController(new Controller());
    }
}
