import { NextFunction, Request, Response, Router } from "express";
import { userControllers } from "./userController";
import validateRequest from "../../middleware/validateRequest";
import { createStudentValidationSchema } from "../students/studentValidation";
import { createFacultyValidationSchema } from "../Faculty/facultyValidation";
import { createAdminValidationSchema } from "../Admin/adminValidation";
import { USER_ROLE } from "./userConstant";
import Auth from "../../middleware/authMid";
import { userValidation } from "./userValidation";
import { upload } from "../../utils/sendImgToCoudinary";
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
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req?.body?.data);
    next();
  },
  validateRequest(createAdminValidationSchema),
  userControllers.createAdmin,
);

userRouter.post(
  '/change-status/:id',
  Auth('admin'),
  validateRequest(userValidation.changeStatusValidationSchema),
  userControllers.changeStatus,
);

userRouter.get('/me', Auth('student', 'faculty', 'admin'), userControllers.getMe);

export default userRouter