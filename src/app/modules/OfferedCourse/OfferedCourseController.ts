import { Request, Response } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import createAsyncFunc from '../../utils/createAsyncFunc';
import { OfferedCourseServices } from './OfferedCourseServices';

const createOfferedCourse = createAsyncFunc(async (req: Request, res: Response) => {
  const result = await OfferedCourseServices.createOfferedCourseIntoDB(
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course is created successfully !',
    data: result,
  });
});

const getAllOfferedCourses = createAsyncFunc(async (req: Request, res: Response) => {
    const result = await OfferedCourseServices.getAllOfferedCoursesFromDB(req.query)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'OfferedCourses retrieved successfully !',
      data: result,
    });
});

const getSingleOfferedCourses = createAsyncFunc(
  async (req: Request, res: Response) => {
    const { id } = req.params;
      const result = await OfferedCourseServices.getSingleOfferedCourseFromDB(id)
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'OfferedCourse fetched successfully',
        data: result,
      });
  },
);

const updateOfferedCourse = createAsyncFunc(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await OfferedCourseServices.updateOfferedCourseIntoDB(
    id,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'OfferedCourse updated successfully',
    data: result,
  });
});

const deleteOfferedCourseFromDB = createAsyncFunc(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await OfferedCourseServices.deleteOfferedCourseFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'OfferedCourse deleted successfully',
      data: result,
    });
  },
);

export const OfferedCourseControllers = {
  createOfferedCourse,
  getAllOfferedCourses,
  getSingleOfferedCourses,
  updateOfferedCourse,
  deleteOfferedCourseFromDB,
};