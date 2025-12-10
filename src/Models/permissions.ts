import { model, Schema } from "mongoose";

const permissionSchema = new Schema({
    key: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
}, { timestamps: true })

export const Permissions = model("Permissions", permissionSchema);