import { TAcademicFaculty } from "./academicFacultyInterface copy 5"
import { academicFacultyModel } from "./academicFacultySchemaModel"

const createAcademicFacultyIntoDb = async(payload: TAcademicFaculty)=> {
    const result = await academicFacultyModel.create(payload)
    return result
}
const getAllAcademicFaculty = async()=> {
    const result = await academicFacultyModel.find()
    return result
}
const getSingleAcademicFaculty = async(id: string)=> {
    const result = await academicFacultyModel.findById(id)
    return result
}
const updateSingleAcademicFaculty = async(id: string, payload: Partial<TAcademicFaculty>)=> {
    const result = await academicFacultyModel.findOneAndUpdate({_id: id},payload, {new: true} )
    return result
}
export const academicFacultyServices = {
    createAcademicFacultyIntoDb,
    getAllAcademicFaculty,
    getSingleAcademicFaculty,
    updateSingleAcademicFaculty
}