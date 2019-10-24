export interface State {
    id: string;
    user_id: string;
    geograph: {
        type: string;
        coordinates: number[];
    };
    status: number;
    fcm_token: string | null;
    notify: boolean;
    datetime: string;
}
