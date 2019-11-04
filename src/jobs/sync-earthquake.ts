import * as Bluebird from 'bluebird';
import { FirebaseContext } from 'tymon';

import BmkgRepository from '../repositories/bmkg_repository';
import EarthquakeRepository from '../repositories/earthquake_repo';

import { TOPICS } from '../utils/constant';
import { Earthquake } from 'src/typings/models/earthquake';
import { stringifyObjectKey } from '../utils/helpers';

const notifyEarthquake = async (earthquake: Earthquake): Promise<void> => {
    const messager = await FirebaseContext.getInstance().messaging();
    await messager.send({
        notification: { title: 'Earthquake Alert', body: 'an earthquake happened' },
        data: stringifyObjectKey(earthquake),
        topic: TOPICS.EARTHQUAKE
    });
};

const handleEarthquake = (earthquake: Earthquake, repo: EarthquakeRepository): Promise<any> => {
    return repo.findOne({ datetime: earthquake.datetime }).then(
        (isExsist): Promise<any> => {
            if (!isExsist) {
                return Promise.all([notifyEarthquake(earthquake), repo.create(earthquake)]);
            }
            return Promise.resolve();
        }
    );
};

export default async (): Promise<void> => {
    const bmkgRepo = new BmkgRepository();
    const earthquakeRepo = new EarthquakeRepository();

    /** get latest earthquake data and concurently handle */
    const earthquakes = await bmkgRepo.getLatestEarthquake();
    await Bluebird.map(earthquakes, (earthquake): Promise<any> => handleEarthquake(earthquake, earthquakeRepo), {
        concurrency: 10
    });
};
