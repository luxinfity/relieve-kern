export interface Position {
    id: string;
    geograph: {
        type: string;
    };
    coordinates: {
        type: number[];
    };
    status: number;
    datetime: string;
}
