import { studentServices } from "./studentService"
import sendResponse from "../../utils/sendResponse"
import createAsyncFunc from "../../utils/createAsyncFunc"
import httpStatus from 'http-status-codes';

const getAllStudents = createAsyncFunc(async (req, res) => {
    const result = await studentServices.getAllStudentsFromDb(req.query);
    console.log(req.query);
    

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Students are retrieved successfully',
        data: result,
    });
});

const getSingleStudents = createAsyncFunc(async (req, res) => {
    const { studentId } = req.params
    const result = await studentServices.getSingleStudentsFromDb(studentId)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student is retrieved succesfully',
        data: result,
    });
})

const updateStudent = createAsyncFunc(async (req, res) => {
    const { studentId } = req.params;
    const { student } = req.body;
    const result = await studentServices.updateStudentIntoDB(studentId, student);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is updated succesfully',
      data: result,
    });
  });
  

const deleteStudent = createAsyncFunc(async (req, res) => {
    const { studentId } = req.params;
    const result = await studentServices.deleteStudentFromDB(studentId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student is deleted succesfully',
        data: result,
    });
});
export const studentControllers = {
    getAllStudents,
    getSingleStudents,
    updateStudent,
    deleteStudent
}