import { type Request, type Response, type NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { Exception } from '@exception';

export function errorMiddleware(
  err: Exception,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = res.statusCode < 500 ? res.statusCode : 500;
  const message = err.message || 'Something went wrong';

  if (isPrismaError(err)) {
    console.log(err);
    // req.log.error(err);
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      data: null,
    });
    return;
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    data: null,
  });
}

function isPrismaError(err: any): err is Prisma.PrismaClientKnownRequestError {
  const errorName = err?.name;
  return errorName && errorName.includes('Prisma');
}
