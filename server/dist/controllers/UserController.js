"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = exports.UserController = void 0;
const UserService_1 = require("../services/UserService");
class UserController {
    async getMe(req, res, next) {
        try {
            // req.user is populated by authMiddleware
            const user = await UserService_1.userService.getUserProfile(req.user.id);
            res.status(200).json({ status: "success", data: { user } });
        }
        catch (error) {
            next(error);
        }
    }
    async updateMe(req, res, next) {
        try {
            const updatedUser = await UserService_1.userService.updateProfile(req.user.id, req.body);
            res.status(200).json({ status: "success", data: { user: updatedUser } });
        }
        catch (error) {
            next(error);
        }
    }
    async deleteMe(req, res, next) {
        try {
            await UserService_1.userService.deleteAccount(req.user.id);
            res.status(204).json({ status: "success", data: null });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.UserController = UserController;
exports.userController = new UserController();
