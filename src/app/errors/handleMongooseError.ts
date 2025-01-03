import mongoose from "mongoose";
import { TerrorSourcres, TgenericErrorResponse } from "../interface/error";

export const handleMongooseError = (err: mongoose.Error.ValidationError): TgenericErrorResponse => {
    const errorSources: TerrorSourcres = Object.values(err.errors).map(
        (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
          return {
            path: val?.path,
            message: val?.message,
          };
        },
      );

    const statusCode = 400;

    return {
        statusCode,
        message: 'Validation Error',
        errorSources,
    };
}