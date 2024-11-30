import { Request, Response, NextFunction } from 'express';

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  // Default error status and message
  const statusCode = err?.status || 500;
  const message = err?.message || 'Something went wrong!';

  // Send the response
  res.status(statusCode).json({
    success: false,
    message,
    error: err,
  });

  // No need to call `next()` here since the response is already sent.
};

export default globalErrorHandler;
