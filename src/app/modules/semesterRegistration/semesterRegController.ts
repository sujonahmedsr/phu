import { RequestHandler } from "express";
import createAsyncFunc from "../../utils/createAsyncFunc";
import sendResponse from "../../utils/sendResponse";
import { SemesterRegistrationService } from "./semesterRegServices";
import httpStatus from 'http-status-codes';

const createSemesterRegistration: RequestHandler = createAsyncFunc(async (req, res, next) => {
    const result = await SemesterRegistrationService.createSemesterRegistrationIntoDB(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semester Registration is created successfully!',
        data: result,
    });
})

const getAllSemesterRegistrations = createAsyncFunc(async (req, res) => {
    const result = await SemesterRegistrationService.getAllSemesterRegistrationsFromDB(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semester Registration is retrieved successfully !',
        data: result,
    });
});

const getSingleSemesterRegistration = createAsyncFunc(async (req, res) => {
    const { id } = req.params;
    const result = await SemesterRegistrationService.getSingleSemesterRegistrationsFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semester Registration is retrieved successfully',
        data: result,
    });
});

const updateSemesterRegistration = createAsyncFunc(async (req, res) => {
    const { id } = req.params;
    const result = await SemesterRegistrationService.updateSemesterRegistrationIntoDB(id, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semester Registration is updated successfully',
        data: result,
    });
});

const deleteSemesterRegistration = createAsyncFunc(async (req, res) => {
    const { id } = req.params;
    const result = await SemesterRegistrationService.deleteSemesterRegistrationFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semester Registration is updated successfully',
        data: result,
    });
});



export const SemesterRegistrationController = {
    createSemesterRegistration,
    getAllSemesterRegistrations,
    getSingleSemesterRegistration,
    updateSemesterRegistration,
    deleteSemesterRegistration,
};