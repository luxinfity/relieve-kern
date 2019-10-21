import { HttpError } from 'tymon';

import BaseController from './base/base_controller';
import { IData, IContext, IHandlerOutput } from '../typings/common';
import BmkgRepository from '../repositories/bmkg_repository';

export default class EarthquakeController extends BaseController {
    public async getLastEarthquake(data: IData, context: IContext): Promise<IHandlerOutput> {
        try {
            const bmkgRepo = new BmkgRepository();
            const earthquake = await bmkgRepo.getLastEarthquake();

            return {
                message: 'last bmkg earthquake retrieved',
                data: earthquake
            };
        } catch (err) {
            if (err.status) throw err;
            throw HttpError.InternalServerError(err.message);
        }
    }

    public async getLastestEarthquake(data: IData, context: IContext): Promise<IHandlerOutput> {
        try {
            const bmkgRepo = new BmkgRepository();
            const earthquakes = await bmkgRepo.getLatestEarthquake();

            return {
                message: 'lastest bmkg earthquake retrieved',
                data: earthquakes
            };
        } catch (err) {
            if (err.status) throw err;
            throw HttpError.InternalServerError(err.message);
        }
    }

    protected setRoutes(): void {
        this.addRoute('get', '/bmkg/last', this.getLastEarthquake);
        this.addRoute('get', '/bmkg/lastest', this.getLastestEarthquake);
    }
}
