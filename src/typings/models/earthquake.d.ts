export interface Coordinates {
    latitude: number;
    longitude: number;
}

export interface Earthquake {
    datetime: string;
    coordinates: Coordinates;
    magnitude: number;
    depth: number;
}
