import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true
    },

    password: {
        type: String,
        required: [true, "Password is required"]
    },

    role: {
        type: String,
        enum: {
            values: ["user", "admin"],
            message: "{VALUE} is not a valid role"
        },
        default: "user"
    }
});

const User = mongoose.model("User", userSchema);

export default User;
