import { Router } from "express";
import { userControllers } from "./userController";
import validateRequest from "../../middleware/validateRequest";
import { createStudentValidationSchema } from "../students/studentValidation";
import { createFacultyValidationSchema } from "../Faculty/facultyValidation";
import { createAdminValidationSchema } from "../Admin/adminValidation";

const userRouter = Router()

userRouter.post('/create-Student', validateRequest(createStudentValidationSchema), userControllers.createStudent)

userRouter.post(
    '/create-faculty',
    validateRequest(createFacultyValidationSchema),
    userControllers.createFaculty,
  );

  userRouter.post(
    '/create-admin',
    validateRequest(createAdminValidationSchema),
    userControllers.createAdmin,
  );

export default userRouter