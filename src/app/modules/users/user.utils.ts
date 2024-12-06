import { TAcademicSemester } from "../academicSemester/academicSemesterInterface";
import { userModel } from "./userSchemModel";

const findLastStudentId = async () => {
    const lastStudent = await userModel.findOne(
        {
            role: 'student'
        },
        {
            id: 1,
            _id: 0
        },

    ).sort({
        createdAt: -1,
    })
        .lean();

        // get only id 0000 not year or code number
    return lastStudent?.id ? lastStudent.id : undefined;
}

export const generateStudentId =async (payload: TAcademicSemester) => {
    let currentId =  (0).toString()
    const lastStudentId = await findLastStudentId()

    const lastStudentSemesterYear = lastStudentId?.substring(0,4);
    const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
    const currentStudentSemesterYear = payload.year;
    const currentStudentSemesterCode = payload.code;

    if (lastStudentId && lastStudentSemesterYear === currentStudentSemesterYear && lastStudentSemesterCode === currentStudentSemesterCode) {
        currentId = lastStudentId.substring(6)
    }

    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0')
    incrementId = `${payload.year}${payload.code}${incrementId}`
    
    return incrementId
}