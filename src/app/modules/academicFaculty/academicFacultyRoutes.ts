import { Router } from "express";
import { academicFacultyController } from "./academicFacultyController";
import validateRequest from "../../middleware/validateRequest";
import { createAcademicFacultyValidationSchema, updateAcademicFacultyValidationSchema } from "./academicFacultyValidation";

const academicFacultyRoute = Router()

academicFacultyRoute.post('/create-academic-faculty', validateRequest(createAcademicFacultyValidationSchema), academicFacultyController.createAcademicFaculty)

academicFacultyRoute.get('/', academicFacultyController.getAllAcademicFaculties)

academicFacultyRoute.get('/:facultyId', academicFacultyController.getSingleAcademicFaculty)

academicFacultyRoute.patch('/:facultyId', validateRequest(updateAcademicFacultyValidationSchema), academicFacultyController.updateAcademicFaculty)

export default academicFacultyRoute