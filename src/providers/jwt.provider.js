import jwt from "jsonwebtoken";

// Danh sách token đã logout (lưu trong RAM, sẽ mất khi restart server)
const tokenBlacklist = new Set();

export const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "1d"
    });
};

export const verifyToken = (token) => {
    if (tokenBlacklist.has(token)) {
        throw new Error("Token has been revoked");
    }

    return jwt.verify(token, process.env.JWT_SECRET);
};

export const revokeToken = (token) => {
    tokenBlacklist.add(token);
};
