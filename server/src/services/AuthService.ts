import jwt, { SignOptions } from "jsonwebtoken";
import { Response } from "express";
import { userRepository } from "../repositories/UserRepository";
import { AppError } from "../utils/AppError";

const signToken = (id: string, secret: string, expiresIn: string) => {
  const options: SignOptions = { expiresIn: expiresIn as any };
  return jwt.sign({ id }, secret, options);
};

const createSendToken = (user: any, statusCode: number, res: Response) => {
  const token = signToken(
    user._id.toString(),
    process.env.JWT_SECRET || "supersecretjwtkey_change_in_production",
    process.env.JWT_EXPIRES_IN || "15m"
  );

  const refreshToken = signToken(
    user._id.toString(),
    process.env.JWT_REFRESH_SECRET || "supersecretrefreshkey_change_in_production",
    process.env.JWT_REFRESH_EXPIRES_IN || "7d"
  );

  const cookieOptions = {
    expires: new Date(Date.now() + 15 * 60 * 1000), // 15 mins
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
  };

  const refreshCookieOptions = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
  };

  res.cookie("jwt", token, cookieOptions);
  res.cookie("refreshToken", refreshToken, refreshCookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

export class AuthService {
  async register(userData: any, res: Response) {
    const existingUser = await userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new AppError("Email already in use", 400);
    }

    const newUser = await userRepository.create(userData);
    createSendToken(newUser, 201, res);
  }

  async login(userData: any, res: Response) {
    const { email, password } = userData;

    if (!email || !password) {
      throw new AppError("Please provide email and password", 400);
    }

    const user = await userRepository.findByEmail(email, true);

    if (!user || !(await user.comparePassword(password))) {
      throw new AppError("Incorrect email or password", 401);
    }

    createSendToken(user, 200, res);
  }

  async logout(res: Response) {
    res.cookie("jwt", "loggedout", {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });
    res.cookie("refreshToken", "loggedout", {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });
    res.status(200).json({ status: "success" });
  }
}

export const authService = new AuthService();
