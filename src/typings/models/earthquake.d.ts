export interface Coordinates {
    latitude: number;
    longitude: number;
}

export interface Earthquake {
    datetime: string;
    latitude: number;
    longitude: number;
    magnitude: number;
    depth: number;
}
