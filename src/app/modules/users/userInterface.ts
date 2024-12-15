import { Model } from "mongoose";
import { USER_ROLE } from "./userConstant";

export interface tUser {
    id: string,
    password: string,
    needsPassChange: boolean,
    passwordChangeAt?: Date
    role: 'admin' | 'student' | 'faculty',
    status: 'in-progress' | 'blocked',
    isDeleted: boolean
}

export interface UserModel extends Model<tUser> {
    isUserExistByCustomId(id: string): Promise<tUser>

    isPasswordMatch(plainTextPassword: string,
        hashedPassword: string,): Promise<boolean>
        
    isJWTIssuedBeforePasswordChanged(
        passwordChangedTimestamp: Date,
        jwtIssuedTimestamp: number,
    ): boolean;
    isJWTIssuedBeforePasswordChanged(
        passwordChangedTimestamp: Date,
        jwtIssuedTimestamp: number,
      ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;