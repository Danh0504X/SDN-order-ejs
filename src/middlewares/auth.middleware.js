import { verifyToken } from "../providers/jwt.provider.js";

// Kiểm tra header: Authorization: Bearer <token>
export const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "No token provided"
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        req.user = verifyToken(token);
        req.token = token;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};

// Phân quyền theo role, phải dùng sau authenticate
export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "You do not have permission to perform this action"
            });
        }

        next();
    };
};

// Dùng cho trang giao diện: trình duyệt không tự gửi header Bearer
// nên token được lưu trong cookie "token"
export const authenticateView = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect("/login");
    }

    try {
        req.user = verifyToken(token);
        // Cho mọi view đều dùng được biến currentUser
        res.locals.currentUser = req.user;
        res.locals.isAdmin = req.user.role === "admin";
        next();
    } catch (error) {
        res.clearCookie("token");
        return res.redirect("/login");
    }
};

export const authorizeView = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).send("You do not have permission to perform this action");
        }

        next();
    };
};
