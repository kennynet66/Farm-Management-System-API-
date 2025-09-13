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
    itemsInStock: {
        type: Number,
        required: [true, "Current stock is required"]
    },
    purchaseDate: {
        type: Date,
        required: [true, "Item purchase date is required"]
    },
    value: {
        type: Number,
        required: [true, "Value is required"]
    }
});
export const InventoryModel = model("Inventory", inventorySchema);