import mongoose from "mongoose";
import httpStatus from 'http-status-codes';
import { TStudent } from "./studentInterface";
import { Student } from "./studentSchemModel"
import AppError from "../../utils/AppError";
import { userModel } from "../users/userSchemModel";
import QueryBuilder from "../../builder/QueryBuilder";

const getAllStudentsFromDb = async (query: Record<string, unknown>) => {
  // // copies all query
  // let queryObj = {...query}

  // // search Query 
  // let searchTerm = ''
  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string;
  // }
  // const searchQuery = Student.find({
  //   $or: ['email','name.firstName', 'presentAddress'].map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   }))
  // })

  // const excludes = ['searchTerm', 'sort', 'limit', 'page', 'fields']
  // excludes.forEach(el => delete queryObj[el])

  // const filterQuery = searchQuery
  //   .find(queryObj)
  //   .populate('admissionSemester')
  //   .populate({
  //     path: 'academicDepartment',
  //     populate: {
  //       path: 'academicFaculty',
  //     },
  //   });
  // ;

  // // sorting query 
  // let sort = '-createdAt'
  // if(query?.sort){
  //   sort = query.sort as string
  // }
  // const sortQuery = filterQuery.sort(sort)

  // // pagination query
  // let limit = 1;
  // let page = 1;
  // let skip = 0
  // if (query?.limit) {
  //   limit = Number(query.limit);
  // }
  // if(query?.page){
  //   page = Number(query.page)
  //   skip = (page - 1) * limit
  // }
  // const pageQuery = sortQuery.skip(skip)
  // const limitQuery = pageQuery.limit(limit)

  // // fields query what a front end developer want
  // let fields = ''
  // if(query?.fields){
  //   fields = (query?.fields as string)?.split(',')?.join(' ')
  // }
  // const filedQuery = await limitQuery.select(fields)

  // // return all chainging in last with filedQuery
  // return filedQuery;

  const serrchableFields = ['email', 'name.firstName', 'presentAddress']

  const studentQuery = new QueryBuilder(Student.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
    , query)
    .search(serrchableFields)
    .sort()
    .filter()
    .paginate()
    .fields()

  const result = await studentQuery.modelQuery
  return result
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