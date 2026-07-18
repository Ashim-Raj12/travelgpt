import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError";

interface JwtPayload {
  id: string;
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return next(
        new AppError("You are not logged in! Please log in to get access.", 401)
      );
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "supersecretjwtkey_change_in_production"
    ) as JwtPayload;

    // Grant access to protected route
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    next(new AppError("Invalid token or token expired.", 401));
  }
};
