import { User, IUser } from "../models/UserModel";

export class UserRepository {
  async create(userData: Partial<IUser>): Promise<IUser> {
    return await User.create(userData);
  }

  async findById(id: string): Promise<IUser | null> {
    return await User.findById(id);
  }

  async findByVerificationToken(token: string) {
    return await User.findOne({ verificationToken: token });
  }

  async findByEmail(email: string, selectPassword = false): Promise<IUser | null> {
    const query = User.findOne({ email });
    if (selectPassword) {
      query.select("+password");
    }
    return await query;
  }

  async updateById(id: string, updateData: Partial<IUser>): Promise<IUser | null> {
    return await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<IUser | null> {
    return await User.findByIdAndDelete(id);
  }
}

export const userRepository = new UserRepository();
