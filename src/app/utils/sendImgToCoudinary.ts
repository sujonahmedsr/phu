import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import multer from 'multer';
import dotenv from 'dotenv';
dotenv.config();

export interface CloudinaryResponse {
    secure_url: string;
    public_id: string;
    // Add more properties as needed from the Cloudinary response
}

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API 
});


export const sendImageToCloudinary = (imageName: string, path: string): Promise<CloudinaryResponse> => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
            path,
            { public_id: imageName.trim() },
            function (error, result) {
                if (error) {
                    reject(error);
                }
                resolve(result as CloudinaryResponse);
                // delete a file asynchronously
                fs.unlink(path, (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('File is deleted.');
                    }
                });
            },
        );
    });
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.cwd() + '/uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    },
});

export const upload = multer({ storage: storage });