import { Router } from "express";
import { userController } from "../controllers/UserController";
import { protect } from "../middlewares/authMiddleware";

const router = Router();

// All user routes require authentication
router.use(protect);

router.get("/me", userController.getMe);
router.patch("/me", userController.updateMe);
router.delete("/me", userController.deleteMe);

export default router;
