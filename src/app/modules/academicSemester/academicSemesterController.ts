import httpStatus from 'http-status-codes';
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


const getAllAcademicSemesters = createAsyncFunc(async (req, res) => {
  const result = await academicSemesterServices.getAllAcademicSemestersFromDB();
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semesters are retrieved successfully',
    data: result,
  });
});

const getSingleAcademicSemester = createAsyncFunc(async (req, res) => {
  const { semesterId } = req.params;
  const result =
    await academicSemesterServices.getSingleAcademicSemesterFromDB(semesterId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is retrieved succesfully',
    data: result,
  });
});

const updateAcademicSemester = createAsyncFunc(async (req, res) => {
  const { semesterId } = req.params;
  const result = await academicSemesterServices.updateAcademicSemesterIntoDB(
    semesterId,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is retrieved succesfully',
    data: result,
  });
});

export const academicSemesterController = {
  createAcademicSemester,
  getAllAcademicSemesters,
  getSingleAcademicSemester,
  updateAcademicSemester
}