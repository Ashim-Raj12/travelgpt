"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = exports.AuthService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserRepository_1 = require("../repositories/UserRepository");
const AppError_1 = require("../utils/AppError");
const signToken = (id, secret, expiresIn) => {
    const options = { expiresIn: expiresIn };
    return jsonwebtoken_1.default.sign({ id }, secret, options);
};
const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id.toString(), process.env.JWT_SECRET || "supersecretjwtkey_change_in_production", process.env.JWT_EXPIRES_IN || "15m");
    const refreshToken = signToken(user._id.toString(), process.env.JWT_REFRESH_SECRET || "supersecretrefreshkey_change_in_production", process.env.JWT_REFRESH_EXPIRES_IN || "7d");
    const cookieOptions = {
        expires: new Date(Date.now() + 15 * 60 * 1000), // 15 mins
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    };
    const refreshCookieOptions = {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    };
    res.cookie("jwt", token, cookieOptions);
    res.cookie("refreshToken", refreshToken, refreshCookieOptions);
    // Remove password from output
    user.password = undefined;
    res.status(statusCode).json({
        status: "success",
        token,
        data: {
            user,
        },
    });
};
const crypto_1 = __importDefault(require("crypto"));
const email_1 = require("../utils/email");
class AuthService {
    async register(userData, res) {
        const existingUser = await UserRepository_1.userRepository.findByEmail(userData.email);
        if (existingUser) {
            throw new AppError_1.AppError("Email already in use", 400);
        }
        // Create a random token
        const verificationToken = crypto_1.default.randomBytes(32).toString("hex");
        const newUser = await UserRepository_1.userRepository.create({
            ...userData,
            verificationToken,
            isVerified: false,
        });
        // Send verification email
        await (0, email_1.sendVerificationEmail)(newUser.email, verificationToken);
        res.status(201).json({
            status: "success",
            message: "Registration successful. Please check your email to verify your account.",
        });
    }
    async verifyEmail(token, res) {
        const user = await UserRepository_1.userRepository.findByVerificationToken(token);
        if (!user) {
            throw new AppError_1.AppError("Invalid or expired verification token.", 400);
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        await user.save();
        res.status(200).json({
            status: "success",
            message: "Email successfully verified. You can now log in.",
        });
    }
    async login(userData, res) {
        const { email, password } = userData;
        if (!email || !password) {
            throw new AppError_1.AppError("Please provide email and password", 400);
        }
        const user = await UserRepository_1.userRepository.findByEmail(email, true);
        if (!user || !(await user.comparePassword(password))) {
            throw new AppError_1.AppError("Incorrect email or password", 401);
        }
        if (!user.isVerified) {
            throw new AppError_1.AppError("Please verify your email address before logging in.", 401);
        }
        createSendToken(user, 200, res);
    }
    async logout(res) {
        res.cookie("jwt", "loggedout", {
            expires: new Date(Date.now() + 10 * 1000),
            httpOnly: true,
        });
        res.cookie("refreshToken", "loggedout", {
            expires: new Date(Date.now() + 10 * 1000),
            httpOnly: true,
        });
        res.status(200).json({ status: "success" });
    }
}
exports.AuthService = AuthService;
exports.authService = new AuthService();
