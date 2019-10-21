import { Request, Response, NextFunction, RequestHandler } from 'express';
import { OK } from 'http-status-codes';
import { Context, Data, methodHandler, HttpOutput, HandlerOutput } from '../../typings/common';

const parseInput = (req: Request): Data => ({
    query: req.query,
    params: req.params,
    body: req.body
});

export default (method: methodHandler): RequestHandler => async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const data: Data = parseInput(req);
        const context: Context = req && req.context;

        const { message = 'success', data: outData = {}, status = OK, pagination }: HandlerOutput = await method(
            data,
            context
        );

        return res.status(OK).json({
            meta: {
                user_message: message,
                code: status
            },
            data: outData,
            pagination
        });
    } catch (err) {
        return next(err);
    }
};
