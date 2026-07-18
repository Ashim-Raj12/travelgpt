"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const zod_1 = require("zod");
const AppError_1 = require("../utils/AppError");
const validateRequest = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const errorMessages = error.errors.map((issue) => ({
                    message: `${issue.path.join('.')} is ${issue.message}`,
                }));
                res.status(400).json({ status: "fail", errors: errorMessages });
            }
            else {
                next(new AppError_1.AppError("Internal Server Error during validation", 500));
            }
        }
    };
};
exports.validateRequest = validateRequest;
