import { model, Schema } from "mongoose";
import { TAcademicSemester } from "./academicSemesterInterface";
import { AcademicSemesterCode, AcademicSemesterName, Months } from "./academicSemesterCnst";

const acdemicSemesterSchema = new Schema<TAcademicSemester>(
    {
        name: {
            type: String,
            required: true,
            enum: AcademicSemesterName,
        },
        year: {
            type: String,
            required: true,
        },
        code: {
            type: String,
            required: true,
            enum: AcademicSemesterCode,
        },
        startMonth: {
            type: String,
            required: true,
            enum: Months,
        },
        endMonth: {
            type: String,
            required: true,
            enum: Months,
        },
    },
    {
        timestamps: true,
    },
)

acdemicSemesterSchema.pre('save', async function(next){
    const isExistSemester = await academicSemesterModel.findOne({
        year: this.year,
        name: this.name
    })
    if (isExistSemester) {
        throw new Error('Semester is already exists')
    }
    next()
})

export const academicSemesterModel = model<TAcademicSemester>('academicSemeters', acdemicSemesterSchema)