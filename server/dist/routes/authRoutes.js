"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = require("../controllers/AuthController");
const validateRequest_1 = require("../middlewares/validateRequest");
const zod_1 = require("zod");
const router = (0, express_1.Router)();
const registerSchema = zod_1.z.object({
    body: zod_1.z.object({
        firstName: zod_1.z.string().min(2, "First name is too short"),
        lastName: zod_1.z.string().min(2, "Last name is too short"),
        email: zod_1.z.string().email("Invalid email address"),
        password: zod_1.z.string().min(8, "Password must be at least 8 characters"),
    }),
});
const loginSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email("Invalid email address"),
        password: zod_1.z.string().min(1, "Password is required"),
    }),
});
router.post("/register", (0, validateRequest_1.validateRequest)(registerSchema), AuthController_1.authController.register);
router.get("/verify/:token", AuthController_1.authController.verifyEmail);
router.post("/login", (0, validateRequest_1.validateRequest)(loginSchema), AuthController_1.authController.login);
router.post("/logout", AuthController_1.authController.logout);
exports.default = router;
