import { Request, Response } from 'express';
// import httpStatus from 'http-status';
import httpStatus from 'http-status-codes';

const notFound = (req: Request, res: Response): void => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'API Not Found !!',
    error: '',
  });
};


export default notFound;
