import { NextFunction, Request, Response } from "express"
import { AnyZodObject } from "zod"
import createAsyncFunc from "../utils/createAsyncFunc"
import AppError from "../utils/AppError"
import httpStatus from "http-status-codes"
import jwt, { JwtPayload } from "jsonwebtoken"
import { TUserRole } from "../modules/users/userInterface"
import { userModel } from "../modules/users/userSchemModel"


// interface CustomRequest extends Request {
//     user?: JwtPayload
// }
const Auth = (...requiredRoles: TUserRole[]) => {
    return createAsyncFunc(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization
        if (!token) {
            throw new AppError(httpStatus.UNAUTHORIZED, "UnAuthorized access")
        }

        const decoded = jwt.verify(
            token,
            process.env.SECRET_JWT as string,
        ) as JwtPayload;

        const { role, userId, iat } = decoded;

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

        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AppError(
                httpStatus.UNAUTHORIZED,
                'You are not authorized  hi!',
            );
        }

        req.user = decoded as JwtPayload;
        next();
    })
}
export default Auth