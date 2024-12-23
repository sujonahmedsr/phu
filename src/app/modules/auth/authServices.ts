import AppError from "../../utils/AppError";
import { userModel } from "../users/userSchemModel";
import { TLoginUser } from "./authInterface";
import httpStatus from 'http-status-codes'
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { createToken } from "./authUtils";
import sendMail from "../../utils/sendMail";

const loginUser = async (payload: TLoginUser) => {
    const user = await userModel.isUserExistByCustomId(payload?.id)
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
    }

    const isUserDelete = user?.isDeleted
    if (isUserDelete) {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is Deleted !')
    }

    const isUserBlock = user?.status
    if (isUserBlock === 'blocked') {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked !')
    }

    // //checking password

    if (! await userModel.isPasswordMatch(payload?.password, user?.password)) {
        throw new AppError(httpStatus.FORBIDDEN, 'Password not match')
    }

    const jwtPayload = {
        userId: user?.id,
        role: user?.role
    }

    const accessToken = createToken(jwtPayload, process.env.SECRET_JWT as string, process.env.JWT_ACCESS_EXPIRES_IN as string)

    const refreshToken = createToken(jwtPayload, process.env.REFRESH_JWT as string, process.env.JWT_ACCESS_REFRESH_IN as string)

    return {
        accessToken,
        refreshToken,
        needsPassChange: user?.needsPassChange
    }
}

const changePasswordDb = async (userData: JwtPayload,
    payload: { oldPassword: string; newPassword: string }) => {
    // checking if the user is exist

    const user = await userModel.isUserExistByCustomId(userData?.userId)
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
    }

    const isUserDelete = user?.isDeleted
    if (isUserDelete) {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is Deleted !')
    }

    const isUserBlock = user?.status
    if (isUserBlock === 'blocked') {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked !')
    }

    //checking if the password is correct

    if (!(await userModel.isPasswordMatch(payload?.oldPassword, user?.password)))
        throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

    const salt = await bcrypt.genSalt(10);

    //   hash pass 
    const newPassword = await bcrypt.hash(payload?.newPassword, salt)

    await userModel.findOneAndUpdate({
        id: userData?.userId,
        role: userData?.role
    }, { password: newPassword, needsPassChange: false, passwordChangeAt: new Date() })

    // working in this 
    return null
}

const refreshToken = async (token: string) => {
    const decoded = jwt.verify(
        token,
        process.env.REFRESH_JWT as string,
    ) as JwtPayload;

    const { userId, iat } = decoded;

    // checking if the user is exist
    const user = await userModel.isUserExistByCustomId(userId);

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
    // checking if the user is already deleted

    const isDeleted = user?.isDeleted;

    if (isDeleted) {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
    }

    // checking if the user is blocked
    const userStatus = user?.status;

    if (userStatus === 'blocked') {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
    }

    if (
        user.passwordChangeAt &&
        userModel.isJWTIssuedBeforePasswordChanged(
            user.passwordChangeAt,
            iat as number,
        )
    ) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
    }

    const jwtPayload = {
        userId: user?.id,
        role: user?.role
    }

    const accessToken = createToken(jwtPayload, process.env.SECRET_JWT as string, process.env.JWT_ACCESS_EXPIRES_IN as string)

    return {
        accessToken,
    };
}

const forgetPasswordDb = async (userId: string) => {
    // checking if the user is exist
    const user = await userModel.isUserExistByCustomId(userId);

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
    // checking if the user is already deleted

    const isDeleted = user?.isDeleted;

    if (isDeleted) {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
    }

    // checking if the user is blocked
    const userStatus = user?.status;

    if (userStatus === 'blocked') {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
    }

    const jwtPayload = {
        userId: user?.id,
        role: user?.role
    }

    const resetToken = createToken(jwtPayload, process.env.SECRET_JWT as string, '10m')

    const resetLink = `${process.env.RESET_UI_LINK}?id=${user.id}&token=${resetToken}`

    sendMail(user?.email, resetLink)
}

const resetPassword = async (payload: { id: string; newPassword: string },
    token: string) => {
    const user = await userModel.isUserExistByCustomId(payload?.id);

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
    // checking if the user is already deleted

    const isDeleted = user?.isDeleted;

    if (isDeleted) {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
    }

    // checking if the user is blocked
    const userStatus = user?.status;

    if (userStatus === 'blocked') {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
    }

    const decoded = jwt.verify(
        token,
        process.env.SECRET_JWT as string,
    ) as JwtPayload;

    if (payload.id !== decoded.userId) {
        console.log(payload.id, decoded.userId);
        throw new AppError(httpStatus.FORBIDDEN, 'You are forbidden!');
    }

    const salt = await bcrypt.genSalt(10);

    //   hash pass 
    const newPassword = await bcrypt.hash(payload?.newPassword, salt)

    await userModel.findOneAndUpdate({
        id: decoded?.userId,
        role: decoded?.role
    }, { password: newPassword, needsPassChange: false, passwordChangeAt: new Date() })
}

export const AuthServices = {
    loginUser,
    changePasswordDb,
    refreshToken,
    forgetPasswordDb,
    resetPassword
}