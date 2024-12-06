import mongoose from "mongoose";
import httpStatus from 'http-status';
import { TStudent } from "./studentInterface";
import { Student } from "./studentSchemModel"
import AppError from "../../utils/AppError";
import { userModel } from "../users/userSchemModel";

const getAllStudentsFromDb = async (query: Record<string, unknown>) => {

  let searchTerm = ''

  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string; 
  }
  
  const result = await Student.find({
    $or: ['email', 'name.firstName', 'presentAddress'].map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
   }))
  })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  ;

  return result;
};

const getSingleStudentsFromDb = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  return result;
}

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;


  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  /*
    guardain: {
      fatherOccupation:"Teacher"
    }
 
    guardian.fatherOccupation = Teacher
 
    name.firstName = 'Mezba'
    name.lastName = 'Abedin'
  */

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  console.log(modifiedUpdatedData);

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};


const deleteStudentFromDB = async (id: string) => {
  const sesstion = await mongoose.startSession()
  try {
    sesstion.startTransaction()

    const deleteStudent = await Student.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, sesstion });
    if (!deleteStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student')
    }

    const deletedUser = await userModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, sesstion },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await sesstion.commitTransaction()
    await sesstion.endSession()

    return deleteStudent;

  } catch (error) {
    await sesstion.abortTransaction()
    await sesstion.endSession()
    throw new Error('Failed to delete student')
  }

};
export const studentServices = {
  getAllStudentsFromDb,
  getSingleStudentsFromDb,
  updateStudentIntoDB,
  deleteStudentFromDB
}