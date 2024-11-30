import { Response } from "express";

interface tResponse<T> {
    statusCode: number;
    success: boolean;
    message?: string;
    data: T;
}

const sendResponse = <T>(res: Response, data: tResponse<T>) => {
    res.status(data?.statusCode).json({
        success: data.success,
        message: data.message,
        data: data.data,
    })
}
export default sendResponse