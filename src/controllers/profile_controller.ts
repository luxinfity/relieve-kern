import { HttpError } from 'tymon';

import { Context, Data, HandlerOutput } from 'src/typings/common';
import AuthMiddleware from '../middlewares/firebase-auth';
import BaseController from './base/base_controller';

export default class ProfileController extends BaseController {
    public constructor() {
        super();
        this.setMiddleware(AuthMiddleware);
    }

    public async getProfile(data: Data, context: Context): Promise<HandlerOutput> {
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
