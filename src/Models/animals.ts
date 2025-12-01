import { model, Schema } from "mongoose";

const animalsSchema = new Schema({
    tagNumber: {
        type: String,
        required: [true, "Tag number is required"]
    },
    sex: {
        type: String,
        required: true,
        enum: ["male", "female"]
    },
    birthDate: {
        type: Date,
        required: [true, "Animal date of birth is required"]
    },
    weight: {
        type: Number,
        required: [true, "Animal weight is required"]
    },
    status: {
        type: String,
        required: true,
        enum: ["active", "sold", "dead", "sick"]
    },
    notes: {
        type: String,
        required: false
    },
    breedId: {
        type: String,
        required: [true, "Breed is required"]
    }
}, { timestamps: true });

export const animals = model("Animals", animalsSchema);