import { model, Schema } from "mongoose";
import { tUser } from "./userInterface";
import bcrypt from 'bcrypt'

const userSchema = new Schema<tUser>({
    id: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    needsPassChange: {
        type: Boolean,
        default: true,
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

export const userModel = model<tUser>('users', userSchema)