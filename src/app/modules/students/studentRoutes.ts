import { Router } from "express";
import { studentControllers } from "./studentController";
import validateRequest from "../../middleware/validateRequest";
import { updateStudentValidationSchema } from "./studentValidation";

const studenRoutes = Router()

// studenRoutes.get('/', studentControllers.getAllStudents)
studenRoutes.get('/', studentControllers.getAllStudents)
studenRoutes.get('/:studentId', studentControllers.getSingleStudents)
studenRoutes.patch('/:studentId', validateRequest(updateStudentValidationSchema), studentControllers.updateStudent)
studenRoutes.delete('/:studentId', studentControllers.deleteStudent)


export default studenRoutes