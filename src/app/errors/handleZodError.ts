import { ZodError } from "zod";
import { TerrorSourcres, TgenericErrorResponse } from "../interface/error";

export const handleZodError = (err: ZodError): TgenericErrorResponse => {
    const errorSources: TerrorSourcres = err.issues.map(issue => {
        return {
            path: issue?.path[issue.path.length - 1],
            message: issue.message,
        };
    })

    const statusCode = 400

    return {
        statusCode,
        message: 'Validation Error',
        errorSources,
    };
}