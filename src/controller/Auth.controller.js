import {
    registerService,
    loginService,
    logoutService,
    getProfileService
} from "../services/Auth.service.js";

export const register = async (req, res) => {
    try {
        const user = await registerService(req.body);

        return res.status(201).json({
            success: true,
            message: "Register successfully",
            data: user
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const login = async (req, res) => {
    try {
        const result = await loginService(req.body);

        return res.status(200).json({
            success: true,
            message: "Login successfully",
            data: result
        });
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message
        });
    }
};

export const logout = async (req, res) => {
    try {
        await logoutService(req.token);

        return res.status(200).json({
            success: true,
            message: "Logout successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getProfile = async (req, res) => {
    try {
        const user = await getProfileService(req.user.id);

        return res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message
        });
    }
};
