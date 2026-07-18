import { Router } from "express";
import { authController } from "../controllers/AuthController";
import { validateRequest } from "../middlewares/validateRequest";
import { z } from "zod";

const router = Router();

const registerSchema = z.object({
  body: z.object({
    firstName: z.string().min(2, "First name is too short"),
    lastName: z.string().min(2, "Last name is too short"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
  }),
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
  }),
});

import { protect } from "../middlewares/authMiddleware";

router.post("/register", validateRequest(registerSchema), authController.register);
router.get("/verify/:token", authController.verifyEmail);
router.post("/login", validateRequest(loginSchema), authController.login);
router.post("/logout", authController.logout);
router.get("/me", protect, authController.getMe);

export default router;
