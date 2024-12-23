import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { AuthValidation } from "./authValidation";
import { AuthControllers } from "./authController";
import { USER_ROLE } from "../users/userConstant";
import Auth from "../../middleware/authMid";

const authRoutes = Router()

authRoutes.post('/login', validateRequest(AuthValidation.loginValidationSchema), AuthControllers.loginUser)

authRoutes.post(
  '/change-password',
  Auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthControllers.changePassword,
);

authRoutes.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);

authRoutes.post('/forget-password', validateRequest(AuthValidation.fortgetPasswordValidatoinSchema), AuthControllers.forgetPassword)

authRoutes.post('/reset-password', validateRequest(AuthValidation.resetPasswordValidatoinSchema), AuthControllers.resetPassword)

export default authRoutes