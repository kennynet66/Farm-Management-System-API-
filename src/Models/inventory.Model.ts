import { Schema, model } from "mongoose"
import { Units } from "../Types/global.Types";
const inventorySchema = new Schema({
    itemName: {
        type: String,
        required: [true, "Item name is required"]
    },
    category: {
        type: String,
        required: [true, "Category is required"],
        enum: ["supplies", "equipment", "seeds"]
    },
    unit: {
        type: String,
        required: [true, "Unit of measurement is required"],
        enum: Units
    },
    purchaseDate: {
        type: Date,
        required: [true, "Item purchase date is required"]
    },
    value: {
        type: Number,
        required: [true, "Value is required"]
    },
    currentStock: {
        type: Number,
        required: [true, "Current stock is required"],
    },
    location: {
        locationName: {
            type: String,
            required: [true, "Location name is required"],
            default: "Not Set"
        },
        locationDescription: {
            type: String,
            required: true,
            default: "Not set"
        }
    },
    minStock: {
        type: Number,
        required: [false, "Minimum required stock cannot be empty"],
        default: 1
    },
    maxStock: {
        type: Number,
        required: [false, "Minimum required stock cannot be empty"],
        default: 100
    }
});
export const InventoryModel = model("Inventory", inventorySchema);