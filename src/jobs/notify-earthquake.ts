import { FirebaseContext } from 'tymon';
import * as Bluebird from 'bluebird';

import { JobInput } from 'src/typings/common';
import { Earthquake } from 'src/typings/models/earthquake';
import StateRepository from '../repositories/state_repository';
import { State } from 'src/typings/state';
import { stringifyObjectKey } from 'src/utils/helpers';

const notifyUser = async (messager: any, user: State, earthquake: Earthquake): Promise<void> => {
    await messager().sendToDevice(user.fcm_token, stringifyObjectKey(earthquake), {
        title: 'EARTHQUAKE_NOTIFICATION',
        body: 'youre within an earthquake affected radius'
    });
};

export default async ({ data }: JobInput<{ payload: Earthquake }>): Promise<void> => {
    const stateRepo = new StateRepository();
    const messager = await FirebaseContext.getInstance().messaging();

    /** search all notifiable user where has fcm token */
    const users = stateRepo.findAll({
        notify: true,
        fcm_token: { $ne: null }
    });

    await Bluebird.map(users, (state): Promise<void> => notifyUser(messager, state, data.payload));
};
