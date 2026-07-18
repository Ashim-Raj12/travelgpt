import { Request, Response, NextFunction } from "express";
import { ZodObject, ZodError } from "zod";
import { AppError } from "../utils/AppError";

export const validateRequest = (schema: ZodObject<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = (error as any).errors.map((issue: any) => ({
          message: `${issue.path.join('.')} is ${issue.message}`,
        }));
        res.status(400).json({ status: "fail", errors: errorMessages });
      } else {
        next(new AppError("Internal Server Error during validation", 500));
      }
    }
  };
};
