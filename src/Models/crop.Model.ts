import { Schema, model } from "mongoose";

const cropSchema = new Schema({
    name: {
        type: String,
        required: [true, "Crop name is required"]
    },
    variety: {
        type: String,
        required: false
    },
    area: {
        type: Number,
        required: [true, "Land size in acres is required"]
    },
    cropStatus: {
        type: String,
        required: true,
        enum: ["active", "ready_to_harvest", "harvested"],
        default: "active"
    },
    plantingDate: {
        type: Date,
        required: [true, "Planting date is required"]
    },
    expectedHarvestDate: {
        type: Date,
        required: [true, "Expected harvest date is required"]
    },
    areaUnit: {
        type: String,
        required: [false, ""],
        default: "acre",
        enum: ["acre"]
    }
});

export const CropModel = model("Crops", cropSchema);