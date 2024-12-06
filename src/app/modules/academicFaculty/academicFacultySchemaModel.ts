import { model, Schema } from "mongoose";
import { TAcademicFaculty } from "./academicFacultyInterface copy 5";

const academicFacultySchema = new Schema<TAcademicFaculty>({
    name: {type: String, required: [true, 'Name is required']}
},{timestamps: true})

export const academicFacultyModel = model<TAcademicFaculty>('AcademicFaculty', academicFacultySchema)