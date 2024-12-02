import { academicSemesterCodeName } from "./academicSemesterCnst";
import { TAcademicSemester } from "./academicSemesterInterface";
import { academicSemesterModel } from "./academicSemesterSchemaModel";

const academicSemesterCreateIntoDb = async (payload: TAcademicSemester) => {

    // check semester code is valid or not 
    if (academicSemesterCodeName[payload.name] !== payload.code) {
        throw new Error('Invalid Semester Code')
    }

    const result = await academicSemesterModel.create(payload);
    return result
}

export const academicSemesterServices = {
    academicSemesterCreateIntoDb
}