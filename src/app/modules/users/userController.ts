import httpStatus from 'http-status-codes';

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
})

const createFaculty = createAsyncFunc(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  const result = await userServices.createFacultyIntoDB(password, facultyData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is created succesfully',
    data: result,
  });
});


const createAdmin = createAsyncFunc(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await userServices.createAdminIntoDB(password, adminData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created succesfully',
    data: result,
  });
});

export const userControllers = {
  createStudent,
  createFaculty,
  createAdmin
}