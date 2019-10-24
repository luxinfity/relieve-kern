import * as Joi from '@hapi/joi';
import { HttpError } from 'tymon';
import { COMMON_ERRORS } from '../utils/constant';

const PAGINATION = {
    page: Joi.number()
        .integer()
        .positive()
        .default(1)
        .optional(),
    per_page: Joi.number()
        .integer()
        .positive()
        .default(10)
        .optional(),
    sort: Joi.string()
        .optional()
        .default('-created_at')
};

const schemas: { [s: string]: Joi.ObjectSchema } = {
    eartquakeList: Joi.object({
        query: Joi.object({
            ...PAGINATION
        }).required()
    })
};

const defaultOptions: object = {
    stripUnknown: {
        arrays: false,
        objects: true
    },
    abortEarly: false
};

export default (input: object, schema: string, options: object = defaultOptions): any => {
    const scheme: Joi.ObjectSchema = schemas[schema];

    return Joi.validate(input, scheme, options).catch((err): void => {
        const details = err.details.reduce((detail: any, item: any): object => {
            detail[item.context.key] = item.message.replace(/"/g, '');
            return detail;
        }, {});
        throw HttpError.UnprocessableEntity('error validating fields', COMMON_ERRORS.VALIDATION_ERROR, details);
    });
};
