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
}

export const authController = new AuthController();
