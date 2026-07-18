import { userRepository } from "../repositories/UserRepository";
import { AppError } from "../utils/AppError";

export class UserService {
  async getUserProfile(userId: string) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return user;
  }

  async updateProfile(userId: string, data: any) {
    // Prevent updating critical fields via this endpoint
    if (data.password || data.email) {
      throw new AppError("This route is not for password or email updates.", 400);
    }

    const updatedUser = await userRepository.updateById(userId, data);
    if (!updatedUser) {
      throw new AppError("User not found", 404);
    }
    return updatedUser;
  }

  async deleteAccount(userId: string) {
    const user = await userRepository.deleteById(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return user;
  }
}

export const userService = new UserService();
