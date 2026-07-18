import { Request, Response, NextFunction } from "express";
import { userService } from "../services/UserService";

export class UserController {
  async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      // req.user is populated by authMiddleware
      const user = await userService.getUserProfile(req.user!.id);
      res.status(200).json({ status: "success", data: { user } });
    } catch (error) {
      next(error);
    }
  }

  async updateMe(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedUser = await userService.updateProfile(req.user!.id, req.body);
      res.status(200).json({ status: "success", data: { user: updatedUser } });
    } catch (error) {
      next(error);
    }
  }

  async deleteMe(req: Request, res: Response, next: NextFunction) {
    try {
      await userService.deleteAccount(req.user!.id);
      res.status(204).json({ status: "success", data: null });
    } catch (error) {
      next(error);
    }
  }
}

export const userController = new UserController();
