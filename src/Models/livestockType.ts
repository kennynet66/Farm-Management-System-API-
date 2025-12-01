import { Schema, model } from "mongoose";

const livestockTypesSchema = new Schema({
    name: {
        type: String,
        required: [true, "Livestock type name is required"]
    },
    description: {
        type: String,
        required: false
    },
    isSystemDefault: {
        type: Boolean,
        required: true
    }
}, { timestamps: true })

export const livestockTypes = model("Livestock types", livestockTypesSchema);