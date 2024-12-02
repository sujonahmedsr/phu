import httpStatus from 'http-status';
import { academicSemesterServices } from "./academicSemesterServices";
import sendResponse from "../../utils/sendResponse";
import createAsyncFunc from "../../utils/createAsyncFunc";

const createAcademicSemester = createAsyncFunc(async (req, res) => {
    const result = await academicSemesterServices.academicSemesterCreateIntoDb(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic semester is created succesfully',
        data: result,
    });
})
export const academicSemesterController = {
    createAcademicSemester
}