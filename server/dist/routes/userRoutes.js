"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
// All user routes require authentication
router.use(authMiddleware_1.protect);
router.get("/me", UserController_1.userController.getMe);
router.patch("/me", UserController_1.userController.updateMe);
router.delete("/me", UserController_1.userController.deleteMe);
exports.default = router;
