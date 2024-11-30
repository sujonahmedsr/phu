import { TStudent } from "../students/studentInterface"
import { Student } from "../students/studentSchemModel";
import { tUser } from "./userInterface";
import { userModel } from "./userSchemModel";

const def_Pass = process.env.DEF_PASS

const createStudentInToDb = async (password: string, studentData: TStudent) => {
    // create a user object 
    const userData: Partial<tUser> = {}

    // if password not given, use default password
    userData.password = password || def_Pass as string;

    // set role 
    userData.role = 'student'

    const newUser = await userModel.create(studentData);

    if (Object.keys(newUser).length) {
        studentData.id = newUser.id;
        studentData.user = newUser._id; //reference _id

        const newStudent = await Student.create(studentData)
        return newStudent
    }
    return newUser;
}
export const userServices = {
    createStudentInToDb
}