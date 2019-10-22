import * as Bluebird from 'bluebird';

import BmkgRepository from '../repositories/bmkg_repository';
import EarthquakeRepository from '../repositories/earthquake_repo';

export default async (): Promise<void> => {
    const bmkgRepo = new BmkgRepository();
    const earthquakeRepo = new EarthquakeRepository();

    const earthquakes = await bmkgRepo.getLatestEarthquake();
    await Bluebird.map(
        earthquakes,
        (earthquake): Promise<void> => earthquakeRepo.upsert({ datetime: earthquake.datetime }, earthquake),
        { concurrency: 10 }
    );
};
