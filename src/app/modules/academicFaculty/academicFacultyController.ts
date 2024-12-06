import createAsyncFunc from "../../utils/createAsyncFunc";
import sendResponse from "../../utils/sendResponse";
import { academicFacultyServices } from "./academicFacultyService";
import httpStatus from 'http-status-codes';

const createAcademicFaculty = createAsyncFunc(async (req, res) => {
    const result = await academicFacultyServices.createAcademicFacultyIntoDb(
        req.body,
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic faculty is created succesfully',
        data: result,
    });
});

const getAllAcademicFaculties = createAsyncFunc(async (req, res) => {
    const result = await academicFacultyServices.getAllAcademicFaculty();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic faculties are retrieved successfully',
        data: result,
    });
});

const getSingleAcademicFaculty = createAsyncFunc(async (req, res) => {
    const { facultyId } = req.params;
    const result =
        await academicFacultyServices.getSingleAcademicFaculty(facultyId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic faculty is retrieved succesfully',
        data: result,
    });
});

const updateAcademicFaculty = createAsyncFunc(async (req, res) => {
    const { facultyId } = req.params;
    const result = await academicFacultyServices.updateSingleAcademicFaculty(
        facultyId,
        req.body,
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic faculty is updated succesfully',
        data: result,
    });
});
export const academicFacultyController = {
    createAcademicFaculty,
    getAllAcademicFaculties,
    getSingleAcademicFaculty,
    updateAcademicFaculty
}