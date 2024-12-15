import { Router } from "express";
import { userControllers } from "./userController";
import validateRequest from "../../middleware/validateRequest";
import { createStudentValidationSchema } from "../students/studentValidation";
import { createFacultyValidationSchema } from "../Faculty/facultyValidation";
import { createAdminValidationSchema } from "../Admin/adminValidation";
import { USER_ROLE } from "./userConstant";
// import auth from "../../middleware/authMid";

const userRouter = Router()

userRouter.post('/create-Student', 
  // auth(USER_ROLE.admin), 
  validateRequest(createStudentValidationSchema), userControllers.createStudent)

userRouter.post(
    '/create-faculty',
    validateRequest(createFacultyValidationSchema),
    // auth(USER_ROLE.admin),
    userControllers.createFaculty,
  );

  userRouter.post(
    '/create-admin',
    validateRequest(createAdminValidationSchema),
    userControllers.createAdmin,
  );

export default userRouter