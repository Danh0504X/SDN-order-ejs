import {
    loginService,
    logoutService
} from "../services/Auth.service.js";

const COOKIE_OPTIONS = {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000
};

export const renderLogin = async (req, res) => {
    // Đã đăng nhập rồi thì chuyển thẳng tới trang order
    if (req.cookies.token) {
        return res.redirect("/orders");
    }

    res.render("login");
};

export const handleLogin = async (req, res) => {
    try {
        const { token } = await loginService(req.body);

        res.cookie("token", token, COOKIE_OPTIONS);

        res.redirect("/orders");
    } catch (error) {
        res.status(401).render("login", {
            error: error.message,
            username: req.body.username
        });
    }
};

export const handleLogout = async (req, res) => {
    if (req.cookies.token) {
        await logoutService(req.cookies.token);
    }

    res.clearCookie("token");

    res.redirect("/login");
};
