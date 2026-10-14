import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

dotenv.config();

const users = [
    {
        username: "admin",
        password: "admin123",
        role: "admin"
    },
    {
        username: "user",
        password: "user123",
        role: "user"
    }
];

const seedUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        await User.deleteMany();

        const hashedUsers = await Promise.all(
            users.map(async (user) => ({
                ...user,
                password: await bcrypt.hash(user.password, 10)
            }))
        );

        await User.insertMany(hashedUsers);

        console.log("Users seeded successfully");

        process.exit();
    } catch (error) {
        console.error("Seed error:", error);
        process.exit(1);
    }
};

seedUsers();
