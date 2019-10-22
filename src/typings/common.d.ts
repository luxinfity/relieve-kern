import { Router } from 'express';

declare module '*.json' {
    const value: any;
    export default value;
}

declare function require(name: string): any;

export interface ObjectAny {
    [s: string]: any;
}

export interface Pagination {
    page: number;
    per_page: number;
    total_page: number;
    total_data: number;
}

export interface Context {
    email: string;
    phone: string | null;
    user_id: string;
}

export interface Data {
    query: any;
    params: any;
    body: any;
}

export interface HandlerOutput {
    message?: string;
    data?: any;
    status?: number;
    pagination?: Pagination;
}

export type methodHandler = (data: Data, context: Context) => Promise<HandlerOutput>;

export interface HttpError {
    message: string;
    name: string;
    status: number;
    data?: object;
}

export interface HttpOutput {
    data?: any;
    meta: {
        code: number;
        user_message?: string;
        error_message?: string | null;
        error_type?: string;
        error_data?: any;
    };
    pagination?: Pagination;
}

export interface JobInput<Data = { [s: string]: any }> {
    data: Data;
}
