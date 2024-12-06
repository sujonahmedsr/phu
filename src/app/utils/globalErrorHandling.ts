import { ErrorRequestHandler, Request, Response } from 'express';
import { ZodError } from 'zod';
import { handleZodError } from '../errors/handleZodError';
import { TerrorSourcres } from '../interface/error';
import { handleMongooseError } from '../errors/handleMongooseError';
import { handleCastError } from '../errors/handleCastError';
import AppError from './AppError';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // Default error status and message
  let statusCode = err?.status || 500;
  let message = err?.message || 'Something went wrong!';


  let errorSourcres: TerrorSourcres = [{
    path: '',
    message: 'Something went wrong!'
  }]

  if(err instanceof ZodError){
    const simplified = handleZodError(err)
    statusCode = simplified?.statusCode
    message = simplified?.message
    errorSourcres = simplified?.errorSources
  }else if(err?.name === 'ValidationError'){
    const simplified = handleMongooseError(err)
    statusCode = simplified?.statusCode;
    message = simplified?.message;
    errorSourcres = simplified?.errorSources;
  }else if(err?.name === 'CastError'){
    const simplified = handleCastError(err)
    statusCode = simplified?.statusCode;
    message = simplified?.message;
    errorSourcres = simplified?.errorSources;
  }else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err.message;
    errorSourcres = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorSourcres = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }

  
  const NODE_DEV = process.env.NODE_DEV

  // Send the response
  res.status(statusCode).json({
    success: false,
    message,
    errorSourcres,
    stack: NODE_DEV === 'development' ? err?.stack : null
    // error: err,
  });

  // No need to call `next()` here since the response is already sent.
};

export default globalErrorHandler;
