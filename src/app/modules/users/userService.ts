import mongoose from "mongoose";
import AppError from "../../utils/AppError";
import { academicSemesterModel } from "../academicSemester/academicSemesterSchemaModel";
import { TStudent } from "../students/studentInterface"
import { Student } from "../students/studentSchemModel";
import { generateAdminId, generateFacultyId, generateStudentId } from "./user.utils";
import { tUser } from "./userInterface";
import { userModel } from "./userSchemModel";
import httpStatus from 'http-status-codes';
import { TFaculty } from "../Faculty/facultyInterface";
import { AcademicDepartment } from "../academicDep/academicDepInSchemaModel";
import { Faculty } from "../Faculty/facultyScehmaModel";
import { Admin } from "../Admin/adminSchemaModel";

const def_Pass = process.env.DEF_PASS

const createStudentInToDb = async (password: string, studentData: TStudent) => {
    // create a user object 
    const userData: Partial<tUser> = {}

    // if password not given, use default password
    userData.password = password || def_Pass as string;

    // set role 
    userData.role = 'student'

    // admissionSemesterFind with studentData.admissionSemester
    const admissionSemesterFind = await academicSemesterModel.findById(studentData.admissionSemester)

    // check if admissionSemesterFind
    if (!admissionSemesterFind) {
        throw new AppError(httpStatus.NOT_FOUND, "Admission semester not found");
    }


    const session = await mongoose.startSession()

    try {
        session.startTransaction()
        // student id generated 
        userData.id = await generateStudentId(admissionSemesterFind)

        // transaction 1
        // new user create with userData
        const newUser = await userModel.create([userData], { session });

        if (!newUser.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
        }
        studentData.id = newUser[0].id;
        studentData.user = newUser[0]._id; //reference _id

        // transaction 2 
        const newStudent = await Student.create(studentData)
        if (!newStudent) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create strudent')
        }

        await session.commitTransaction()
        await session.endSession()
        return newStudent
    } catch (error: any) {
        await session.abortTransaction()
        await session.endSession()
        throw new Error(error);
    }


    // it's good 


    // student id generated 
    // userData.id = await generateStudentId(admissionSemesterFind)

    // // new user create with userData
    // const newUser = await userModel.create(userData);

    // if (Object.keys(newUser).length) {
    //     studentData.id = newUser.id;
    //     studentData.user = newUser._id; //reference _id

    //     const newStudent = await Student.create(studentData)
    //     return newStudent
    // }
    // return newUser;
}


const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
    // create a user object
    const userData: Partial<tUser> = {};

    //if password is not given , use deafult password
    userData.password = password || (def_Pass as string);

    //set student role
    userData.role = 'faculty';

    // find academic department info
    const academicDepartment = await AcademicDepartment.findById(
        payload.academicDepartment,
    );

    if (!academicDepartment) {
        throw new AppError(400, 'Academic department not found');
    }

    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        //set  generated id
        userData.id = await generateFacultyId();

        // create a user (transaction-1)
        const newUser = await userModel.create([userData], { session }); // array

        //create a faculty
        if (!newUser.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
        }
        // set id , _id as user
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id; //reference _id

        // create a faculty (transaction-2)

        const newFaculty = await Faculty.create([payload], { session });

        if (!newFaculty.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
        }

        await session.commitTransaction();
        await session.endSession();

        return newFaculty;
    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err);
    }
};




const createAdminIntoDB = async (password: string, payload: TFaculty) => {
    // create a user object
    const userData: Partial<tUser> = {};
  
    //if password is not given , use deafult password
    userData.password = password || (def_Pass as string);
  
    //set student role
    userData.role = 'admin';
  
    const session = await mongoose.startSession();
  
    try {
      session.startTransaction();
      //set  generated id
      userData.id = await generateAdminId();
  
      // create a user (transaction-1)
      const newUser = await userModel.create([userData], { session }); 
  
      //create a admin
      if (!newUser.length) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
      }
      // set id , _id as user
      payload.id = newUser[0].id;
      payload.user = newUser[0]._id; //reference _id
  
      // create a admin (transaction-2)
      const newAdmin = await Admin.create([payload], { session });
  
      if (!newAdmin.length) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
      }
  
      await session.commitTransaction();
      await session.endSession();
  
      return newAdmin;
    } catch (err: any) {
      await session.abortTransaction();
      await session.endSession();
      throw new Error(err);
    }
  };
export const userServices = {
    createStudentInToDb,
    createFacultyIntoDB,
    createAdminIntoDB
}