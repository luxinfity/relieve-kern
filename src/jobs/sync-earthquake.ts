import BmkgRepository from '../repositories/bmkg_repository';
import { JobInput } from '../typings/common';

export default async (): Promise<void> => {
    const bmkgRepo = new BmkgRepository();
    const earthquakes = await bmkgRepo.getLatestEarthquake();
    console.log(earthquakes[0]);
};
