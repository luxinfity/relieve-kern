import * as bull from 'bull';
import { ObjectAny } from 'src/typings/common';

export default class Queue {
    private static instance: Queue;
    protected static jobs: ObjectAny = {};
    private constructor() {}

    public static initialize({ connection_string, jobs }: { connection_string: string; jobs: string[] }): void {
        Queue.instance = new Queue();
        jobs.forEach((jobName): void => {
            const job = new bull(jobName, connection_string);
            this.jobs[jobName] = job;
        });
    }

    public static getInstance(): Queue {
        if (!Queue.instance) {
            throw new Error('queue not initialize');
        }

        return Queue.instance;
    }

    public async dispatch(jobName: string, data?: ObjectAny): Promise<void> {
        await Queue.jobs[jobName].add(data);
    }
}
