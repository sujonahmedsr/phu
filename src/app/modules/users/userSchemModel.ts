import { model, Schema } from "mongoose";
import { tUser, UserModel } from "./userInterface";
import bcrypt from 'bcrypt'

const userSchema = new Schema<tUser, UserModel>({
    id: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        select: 0
    },
    needsPassChange: {
        type: Boolean,
        default: true,
    },
    passwordChangeAt: {
        type: Date,
    },
    role: {
        type: String,
        enum: ['student', 'faculty', 'admin'],
    },
    status: {
        type: String,
        enum: ['in-progress', 'blocked'],
        default: 'in-progress',
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true
})


const salt = process.env.BCRIPTSALT

// userSchema.pre('save', async function (next) {
//     // eslint-disable-next-line @typescript-eslint/no-this-alias
//     const user = this;
//     // hashing password and save into DB
//     user.password = await bcrypt.hash(user.password, Number(salt))
//     next()
// })
userSchema.pre('save', async function (next) {
    const user = this;

    if (!user.isModified('password')) {
        return next();
    }

    try {
        // Generate a salt
        const salt = await bcrypt.genSalt(10);
        // Hash the password using the generated salt
        user.password = await bcrypt.hash(user.password, salt);
        next();
    } catch (error: any) {
        next(error);
    }
});

// set '' after saving password
userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});

userSchema.statics.isUserExistByCustomId = async (id: string) => {
    return await userModel.findOne({ id }).select('+password')
}
userSchema.statics.isPasswordMatch = async function (
    plainTextPassword,
    hashedPassword,
) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ) {
    const passwordChangedTime =
      new Date(passwordChangedTimestamp).getTime() / 1000;
    return passwordChangedTime > jwtIssuedTimestamp;
  };

export const userModel = model<tUser, UserModel>('users', userSchema)