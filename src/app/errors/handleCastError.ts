import mongoose from "mongoose";
import { TerrorSourcres, TgenericErrorResponse } from "../interface/error";

export const handleCastError = (err: mongoose.Error.CastError): TgenericErrorResponse =>{
    const errorSources: TerrorSourcres = [{
        path: err.path,
        message: err.message
    }]
    const statusCode = 400
    return {
        statusCode,
        message: 'Invalid Id',
        errorSources
    }
}