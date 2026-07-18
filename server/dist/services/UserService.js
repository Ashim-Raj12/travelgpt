"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = exports.UserService = void 0;
const UserRepository_1 = require("../repositories/UserRepository");
const AppError_1 = require("../utils/AppError");
class UserService {
    async getUserProfile(userId) {
        const user = await UserRepository_1.userRepository.findById(userId);
        if (!user) {
            throw new AppError_1.AppError("User not found", 404);
        }
        return user;
    }
    async updateProfile(userId, data) {
        // Prevent updating critical fields via this endpoint
        if (data.password || data.email) {
            throw new AppError_1.AppError("This route is not for password or email updates.", 400);
        }
        const updatedUser = await UserRepository_1.userRepository.updateById(userId, data);
        if (!updatedUser) {
            throw new AppError_1.AppError("User not found", 404);
        }
        return updatedUser;
    }
    async deleteAccount(userId) {
        const user = await UserRepository_1.userRepository.deleteById(userId);
        if (!user) {
            throw new AppError_1.AppError("User not found", 404);
        }
        return user;
    }
}
exports.UserService = UserService;
exports.userService = new UserService();
