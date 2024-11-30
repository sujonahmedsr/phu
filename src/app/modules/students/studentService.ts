import { Student } from "./studentSchemModel"

const getAllStudentsFromDb = async () => {
    const result = await Student.find()
    return result
}
const getSingleStudentsFromDb = async (id: string) => {
    const result = await Student.aggregate([{ $match: { id } }])
    return result
}
export const studentServices = {
    getAllStudentsFromDb,
    getSingleStudentsFromDb
}