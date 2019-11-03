import { FirebaseContext } from 'tymon';

import { stringifyObjectKey } from '../utils/helpers';
import { JobInput } from 'src/typings/common';
import { Earthquake } from 'src/typings/models/earthquake';

export default async ({ data }: JobInput<{ payload: Earthquake }>): Promise<void> => {
    const messager = await FirebaseContext.getInstance().messaging();

    await messager().send({
        data: stringifyObjectKey(data.payload),
        topic: 'earthquake'
    });
};
