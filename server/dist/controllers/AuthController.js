"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = exports.AuthController = void 0;
const AuthService_1 = require("../services/AuthService");
class AuthController {
    async register(req, res, next) {
        try {
            await AuthService_1.authService.register(req.body, res);
        }
        catch (error) {
            next(error);
        }
    }
    async login(req, res, next) {
        try {
            await AuthService_1.authService.login(req.body, res);
        }
        catch (error) {
            next(error);
        }
    }
    async logout(req, res, next) {
        try {
            await AuthService_1.authService.logout(res);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AuthController = AuthController;
exports.authController = new AuthController();
