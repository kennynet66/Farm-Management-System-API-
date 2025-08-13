import { model, Schema } from "mongoose";

const adminSchema = new Schema({
    userName: {
        type: String,
        unique: [true, "Username must be unique!"],
        required: [true, "Username is required!"],
        lowercase: true
    },
    email: {
        type: String,
        unique: [true, "Email must be unique!"],
        required: [true, "Email is required!"],
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    role: {
        type: String,
        required: true,
        enum: ["admin"],
        default: "admin"
    }
});

export const adminModel = model("Admins", adminSchema);