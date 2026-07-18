"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = exports.UserRepository = void 0;
const UserModel_1 = require("../models/UserModel");
class UserRepository {
    async create(userData) {
        return await UserModel_1.User.create(userData);
    }
    async findById(id) {
        return await UserModel_1.User.findById(id);
    }
    async findByEmail(email, selectPassword = false) {
        const query = UserModel_1.User.findOne({ email });
        if (selectPassword) {
            query.select("+password");
        }
        return await query;
    }
    async updateById(id, updateData) {
        return await UserModel_1.User.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });
    }
    async deleteById(id) {
        return await UserModel_1.User.findByIdAndDelete(id);
    }
}
exports.UserRepository = UserRepository;
exports.userRepository = new UserRepository();
