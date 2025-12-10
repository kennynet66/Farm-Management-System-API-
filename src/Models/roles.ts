import { model, Schema } from "mongoose";

const roleSchema = new Schema({
    key: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    permissions: {
        type: [Schema.Types.ObjectId],
        required: true,
        ref: "Permissions"
    },
    isSystemDefault: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true });

export const Roles = model("Roles", roleSchema);