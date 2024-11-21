import { type Request, type Response, type NextFunction } from 'express';
import { Exception } from '@exception';

export function errorMiddleware(
  err: Exception,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = res.statusCode < 500 ? res.statusCode : 500;
  const message = err.message || 'Something went wrong';

  res.status(statusCode).json({
    success: false,
    message: message,
    data: null,
  });
}
