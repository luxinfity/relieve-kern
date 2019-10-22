import * as moment from 'moment';
import * as axios from 'axios';
import { promisify } from 'bluebird';
import { parseString } from 'xml2js';

import { Earthquake, Coordinates } from '../typings/models/earthquake';
import { BMKG_URL } from '../utils/constant';
import { reduceData } from '../utils/helpers';

export default class BmkgRepository {
    private parseXml: (data: any) => any;

    private getDatetime(data: any): string {
        const [hour] = data.Jam.split(' ');
        return moment(`${data.Tanggal} ${hour}`, 'DD-MMM-YY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
    }

    private getCoordinates(data: any): Coordinates {
        const [longitude, latitude] = data.point.coordinates[0].split(',');
        return {
            latitude: +latitude,
            longitude: +longitude
        };
    }

    private getMagnitude(data: any): number {
        return +data.Magnitude.split(' ')[0];
    }

    private getDepth(data: any): number {
        return +data.Kedalaman.split(' ')[0];
    }

    public constructor() {
        this.parseXml = promisify(parseString);
    }
    public async getLastEarthquake(): Promise<Earthquake> {
        return axios.default
            .get(BMKG_URL.LAST_EARTHQUAKE)
            .then(({ data: xmlResult }): Promise<any> => this.parseXml(xmlResult))
            .then(({ Infogempa: { gempa: [latestParsed] } }): any => reduceData(latestParsed))
            .then(
                (data: any): Earthquake => {
                    const coordinates = this.getCoordinates(data);
                    return {
                        datetime: this.getDatetime(data),
                        latitude: coordinates.latitude,
                        longitude: coordinates.longitude,
                        depth: this.getDepth(data),
                        magnitude: this.getMagnitude(data)
                    };
                }
            );
    }

    public async getLatestEarthquake(): Promise<Earthquake[]> {
        return axios.default
            .get(BMKG_URL.LATEST_EARTHQUAKE)
            .then(({ data: xmlResult }): Promise<any> => this.parseXml(xmlResult))
            .then(({ Infogempa: { gempa: feltParsed } }): any => feltParsed.map(reduceData))
            .then((datas: any): Earthquake[] =>
                datas.map(
                    (data: any): Earthquake => {
                        const coordinates = this.getCoordinates(data);
                        return {
                            datetime: this.getDatetime(data),
                            latitude: coordinates.latitude,
                            longitude: coordinates.longitude,
                            depth: this.getDepth(data),
                            magnitude: this.getMagnitude(data)
                        };
                    }
                )
            );
    }
}
