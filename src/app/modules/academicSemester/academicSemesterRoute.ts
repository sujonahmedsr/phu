import { Router } from "express";
import { academicSemesterController } from "./academicSemesterController";
import validateRequest from "../../middleware/validateRequest";
import { academicSemesterValidation } from "./academicSemesterValidation";

const academicSemesterRoute = Router()

academicSemesterRoute.post('/create-academic-semester', validateRequest(academicSemesterValidation), academicSemesterController.createAcademicSemester)

export default academicSemesterRoute