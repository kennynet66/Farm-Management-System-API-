import { Schema, model } from "mongoose";

const livestockSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    animalType: {
        type: String,
        required: [true, "Animal type is required"]
    },
    breed: {
        type: String,
        required: [true, "Animal breed is required"],
        default: "Nan"
    },
    age: {
        type: Number,
        required: [true, "Animal age is required"]
    },
    sex: {
        type: String,
        required: true,
        enum: ["male", "female"]
    },
    lastCheckUp: {
        type: Date,
        required: false
    }
});

export const livestockModel = model("Livestock", livestockSchema);