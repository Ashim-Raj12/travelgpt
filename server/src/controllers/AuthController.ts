import { Request, Response, NextFunction } from "express";
import { authService } from "../services/AuthService";

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      await authService.register(req.body, res);
    } catch (error) {
      next(error);
    }
  }

  async verifyEmail(req: Request, res: Response, next: NextFunction) {
    try {
      await authService.verifyEmail(req.params.token as string, res);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      await authService.login(req.body, res);
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      await authService.logout(res);
    } catch (error) {
      next(error);
    }
  }

  async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      // The user is attached by the protect middleware
      res.status(200).json({
        status: "success",
        user: (req as any).user
      });
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
