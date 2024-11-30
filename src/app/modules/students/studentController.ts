import { RequestHandler } from "express"
import { studentServices } from "./studentService"
import sendResponse from "../../utils/sendResponse"
import createAsyncFunc from "../../utils/createAsyncFunc"
import httpStatus from 'http-status';

const getAllStudents: RequestHandler = createAsyncFunc(async (req, res, next) => {
    const result = await studentServices.getAllStudentsFromDb()
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Students are retrieved succesfully',
        data: result,
    });
})

const getSingleStudents: RequestHandler = createAsyncFunc(async (req, res, next) => {
    const { studentId } = req.params
    const result = await studentServices.getSingleStudentsFromDb(studentId)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student is retrieved succesfully',
        data: result,
    });
})
export const studentControllers = {
    getAllStudents,
    getSingleStudents
}