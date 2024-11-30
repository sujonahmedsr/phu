import { Router } from "express";
import { userControllers } from "./userController";
import validateRequest from "../../middleware/validateRequest";
import { createStudentValidationSchema } from "../students/studentValidation";

const userRouter = Router()

userRouter.post('/create-Student', validateRequest(createStudentValidationSchema), userControllers.createStudent)

export default userRouter