"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = require("../utils/AppError");
const protect = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }
        else if (req.cookies.jwt) {
            token = req.cookies.jwt;
        }
        if (!token) {
            return next(new AppError_1.AppError("You are not logged in! Please log in to get access.", 401));
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "supersecretjwtkey_change_in_production");
        // Grant access to protected route
        req.user = { id: decoded.id };
        next();
    }
    catch (error) {
        next(new AppError_1.AppError("Invalid token or token expired.", 401));
    }
};
exports.protect = protect;
