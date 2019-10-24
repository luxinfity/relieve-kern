import { JobInput } from 'src/typings/common';
import { Earthquake } from 'src/typings/models/earthquake';

export default async ({ data }: JobInput<{ payload: Earthquake }>): Promise<void> => {
    console.log(data.payload);
};
