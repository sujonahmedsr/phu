import { Router } from "express";
import { academicSemesterController } from "./academicSemesterController";
import validateRequest from "../../middleware/validateRequest";
import { academicSemesterValidation, updateAcademicSemesterValidationSchema } from "./academicSemesterValidation";

const academicSemesterRoute = Router()

academicSemesterRoute.post('/create-academic-semester', validateRequest(academicSemesterValidation), academicSemesterController.createAcademicSemester)

academicSemesterRoute.get('/', academicSemesterController.getAllAcademicSemesters)

academicSemesterRoute.get('/:semesterId', academicSemesterController.getSingleAcademicSemester)

academicSemesterRoute.patch('/:semesterId', validateRequest(updateAcademicSemesterValidationSchema), academicSemesterController.updateAcademicSemester)


export default academicSemesterRoute