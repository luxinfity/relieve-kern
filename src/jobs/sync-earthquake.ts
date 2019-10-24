import * as Bluebird from 'bluebird';

import BmkgRepository from '../repositories/bmkg_repository';
import EarthquakeRepository from '../repositories/earthquake_repo';
import Queue from '../libs/queue';
import { JOBS } from '../utils/constant';
import { Earthquake } from 'src/typings/models/earthquake';

const handleEarthquake = (earthquake: Earthquake, repo: EarthquakeRepository): Promise<any> => {
    return repo.findOne({ datetime: earthquake.datetime }).then(
        (isExsist): Promise<any> => {
            if (!isExsist) {
                return Promise.all([
                    Queue.getInstance().dispatch(JOBS.NOTIFY_EARTHQUAKE, { payload: earthquake }),
                    repo.create(earthquake)
                ]);
            } else {
                return repo.update({ datetime: earthquake.datetime }, earthquake);
            }
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
