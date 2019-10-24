import { HttpError } from 'tymon';
import { Status as Tweet } from 'twitter-d';

import Queue from '../libs/queue';
import BaseController from './base/base_controller';
import { Data, Context, HandlerOutput } from '../typings/common';
import BmkgRepository from '../repositories/bmkg_repository';
import { isEmptyArray } from '../utils/helpers';
import { TWITTER_HASHTAG, JOBS } from '../utils/constant';
import EarthquakeRepository from '../repositories/earthquake_repo';
import Validator from '../middlewares/request_validator';

export default class EarthquakeController extends BaseController {
    public async twitterCallback(data: Data, context: Context): Promise<HandlerOutput> {
        try {
            const {
                body: { tweet_create_events: tweets, for_user_id: user_id }
            }: { body: { for_user_id: string; tweet_create_events: Tweet[] } } = data;

            const filteredTweets = tweets.filter((tweet): boolean => {
                if (!tweet.entities.hashtags) return false;
                const hastags = tweet.entities.hashtags.map((item): string => item.text);
                return hastags.includes(TWITTER_HASHTAG.EARTHQUAKE);
            });

            if (!isEmptyArray(filteredTweets)) {
                await Queue.getInstance().dispatch(JOBS.SYNC_EARTHQUAKE);
            }

            return {
                message: 'acknowledge'
            };
        } catch (err) {
            if (err.status) throw err;
            throw HttpError.InternalServerError(err.message);
        }
    }

    public async dispatchSyncEarthquake(data: Data, context: Context): Promise<HandlerOutput> {
        try {
            await Queue.getInstance().dispatch(JOBS.SYNC_EARTHQUAKE);
            return {
                message: 'sync earthquake job dispatched'
            };
        } catch (err) {
            if (err.status) throw err;
            throw HttpError.InternalServerError(err.message);
        }
    }

    public async getLastEarthquake(data: Data, context: Context): Promise<HandlerOutput> {
        try {
            const bmkgRepo = new BmkgRepository();
            const earthquake = await bmkgRepo.getLastEarthquake();

            await Queue.getInstance().dispatch('sync-earthquake', { payload: earthquake });

            return {
                message: 'last bmkg earthquake retrieved',
                data: earthquake
            };
        } catch (err) {
            if (err.status) throw err;
            throw HttpError.InternalServerError(err.message);
        }
    }

    public async getLastestEarthquake(data: Data, context: Context): Promise<HandlerOutput> {
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

    /** mobile app  */
    public async getEarthquakeList(data: Data, context: Context): Promise<HandlerOutput> {
        const {
            query: { page, per_page, sort }
        } = data;

        const earthquakeRepo = new EarthquakeRepository(context);
        const { data: earthquakes, meta } = await earthquakeRepo.paginate({}, { page, per_page, sort });

        try {
            return {
                message: 'earthquake list retrieved',
                data: earthquakes,
                pagination: meta
            };
        } catch (err) {
            if (err.status) throw err;
            throw HttpError.InternalServerError(err.message);
        }
    }

    protected setRoutes(): void {
        this.addRoute('post', '/callback', this.twitterCallback);
        this.addRoute('post', '/bmkg/sync', this.dispatchSyncEarthquake);

        this.addRoute('get', '/bmkg/last', this.getLastEarthquake);
        this.addRoute('get', '/bmkg/lastest', this.getLastestEarthquake);

        this.addRoute('get', '/', this.getEarthquakeList, Validator('eartquakeList'));
    }
}
