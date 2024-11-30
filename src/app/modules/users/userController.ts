import httpStatus from 'http-status';
import { NextFunction, Request, RequestHandler, Response } from "express"
import sendResponse from "../../utils/sendResponse"
import { userServices } from './userService';
import createAsyncFunc from '../../utils/createAsyncFunc';



const createStudent: RequestHandler = createAsyncFunc(async (req, res, next) => {
    const { password, student: studentData } = req.body;
    const result = await userServices.createStudentInToDb(password, studentData)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Student is created succesfully',
            data: result,
        });
    }
)

export const userControllers = {
    createStudent
}