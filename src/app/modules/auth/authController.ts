import createAsyncFunc from "../../utils/createAsyncFunc";
import sendResponse from "../../utils/sendResponse";
import httpStatus from 'http-status-codes';
import { AuthServices } from "./authServices";

const loginUser = createAsyncFunc(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);

  const { refreshToken, accessToken, needsPassChange } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: process.env.NODE_DEV === 'production',
    httpOnly: true,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is logged in succesfully!',
    data: {
      accessToken,
      needsPassChange
    },
  });
})

const changePassword = createAsyncFunc(async (req, res) => {
  const { ...passwordData } = req.body;

  const result = await AuthServices.changePasswordDb(req.user, passwordData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password is updated succesfully!',
    data: result,
  });
});

const refreshToken = createAsyncFunc(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Refresh token is retrieved succesfully!',
    data: result,
  });
});

const forgetPassword = createAsyncFunc(async (req, res) =>{
  const userId = req.body.id
  const result = await AuthServices.forgetPasswordDb(userId)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reset link is generated succesfully!',
    data: result,
  });
})

const resetPassword = createAsyncFunc(async (req, res) =>{
  const token = req.headers.authorization as string;
  const result = await AuthServices.resetPassword(req.body, token)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password reset succesful!',
    data: result,
  });
})

export const AuthControllers = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword
};