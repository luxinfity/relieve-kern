/// <reference types="../typings/express" />

import { Request, Response, NextFunction } from 'express';
import { HttpError, FirebaseContext } from 'tymon';
import { IContext } from '../typings/common';
import { IFirebaseToken } from '../typings/auth';
import { COMMON_ERRORS } from '../utils/constant';

const generateContext = async (payload: IFirebaseToken): Promise<IContext> => {
    return {
        email: payload.email,
        phone: payload.phone_number || null,
        user_id: payload.uid
    };
};

export default async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const idToken: string | undefined = req.headers.authorization;
        if (!idToken) {
            throw HttpError.NotAuthorized('token not provided', COMMON_ERRORS.TOKEN_INVALID);
        }

        const admin = await FirebaseContext.getInstance();
        const payload = await admin.auth().verifyIdToken(idToken);
        req.context = await generateContext(payload);

        return next();
    } catch (err) {
        return next(err);
    }
};
