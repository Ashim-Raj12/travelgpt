import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

const sendErrorDev = (err: any, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err: any, res: Response) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // Programming or other unknown error: don't leak error details
    console.error("ERROR 💥", err);
    res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }
};

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else {
    let error = { ...err };
    error.message = err.message;
    error.name = err.name;

    // Handle Mongoose errors
    if (error.name === "CastError") {
      error = new AppError(`Invalid ${error.path}: ${error.value}.`, 400);
    }
    if (error.code === 11000) {
      const value = error.errmsg?.match(/(["'])(\\?.)*?\1/)?.[0] || "value";
      error = new AppError(
        `Duplicate field value: ${value}. Please use another value!`,
        400
      );
    }
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((el: any) => el.message);
      error = new AppError(`Invalid input data. ${errors.join(". ")}`, 400);
    }
    
    // Handle JWT errors
    if (error.name === "JsonWebTokenError") {
      error = new AppError("Invalid token. Please log in again!", 401);
    }
    if (error.name === "TokenExpiredError") {
      error = new AppError("Your token has expired! Please log in again.", 401);
    }

    sendErrorProd(error, res);
  }
};
