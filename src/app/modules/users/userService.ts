import mongoose from "mongoose";
import AppError from "../../utils/AppError";
import { academicSemesterModel } from "../academicSemester/academicSemesterSchemaModel";
import { TStudent } from "../students/studentInterface"
import { Student } from "../students/studentSchemModel";
import { generateStudentId } from "./user.utils";
import { tUser } from "./userInterface";
import { userModel } from "./userSchemModel";
import httpStatus from 'http-status-codes';

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
export const userServices = {
    createStudentInToDb
}