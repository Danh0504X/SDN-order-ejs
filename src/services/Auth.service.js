import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import { generateToken, revokeToken } from "../providers/jwt.provider.js";

export const registerService = async (userData) => {
    const { username, password } = userData;

    if (!username || !password) {
        throw new Error("Username and password are required");
    }

    // Kiểm tra độ dài trước khi hash (chuỗi hash luôn dài hơn 6 ký tự)
    if (password.length < 6) {
        throw new Error("Password must be at least 6 characters");
    }

    const existingUser = await User.findOne({ username });

    if (existingUser) {
        throw new Error("Username already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Đăng ký luôn là role "user", tài khoản admin tạo qua seed
    const newUser = await User.create({
        username,
        password: hashedPassword
    });

    return {
        _id: newUser._id,
        username: newUser.username,
        role: newUser.role
    };
};

export const loginService = async (userData) => {
    const { username, password } = userData;

    if (!username || !password) {
        throw new Error("Username and password are required");
    }

    const user = await User.findOne({ username });

    if (!user) {
        throw new Error("Invalid username or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Invalid username or password");
    }

    const token = generateToken({
        id: user._id,
        username: user.username,
        role: user.role
    });

    return {
        token,
        user: {
            _id: user._id,
            username: user.username,
            role: user.role
        }
    };
};

export const logoutService = async (token) => {
    revokeToken(token);
};

export const getProfileService = async (id) => {
    const user = await User.findById(id).select("-password").lean();

    if (!user) {
        throw new Error("User not found");
    }

    return user;
};
