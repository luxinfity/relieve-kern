import { HttpError } from 'tymon';

import { Context, Data, HandlerOutput, ObjectAny } from 'src/typings/common';
import FirebaseAuth from '../middlewares/firebase-auth';
import BaseController from './base/base_controller';
import StateRepository from '../repositories/state_repository';
import { splitCoordinate } from '../utils/helpers';
import Validator from '../middlewares/request_validator';

export default class ProfileController extends BaseController {
    public constructor() {
        super();
        this.setMiddleware(FirebaseAuth);
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

    public async updateState(data: Data, context: Context): Promise<HandlerOutput> {
        try {
            const {
                body: { fcm_token, coordinates, notify, status }
            } = data;

            const stateRepo = new StateRepository(context);

            const payload: ObjectAny = {};
            if (fcm_token) {
                payload['fcm_token'] = fcm_token;
            }
            if (coordinates) {
                const { latitude, longitude } = splitCoordinate(coordinates);
                payload['latitude'] = latitude;
                payload['longitude'] = longitude;
            }
            if (notify) {
                payload['notify'] = notify;
            }
            if (status) {
                payload['status'] = status;
            }

            await stateRepo.upsert({ user_id: context.user_id }, payload);

            return {
                message: 'state update'
            };
        } catch (err) {
            if (err.status) throw err;
            throw HttpError.InternalServerError(err.message);
        }
    }

    protected setRoutes(): void {
        this.addRoute('get', '/', this.getProfile);
        this.addRoute('post', '/state', this.updateState, Validator('updateState'));

        /** nested controllers */
        // this.addChildController(new Controller());
    }
}
