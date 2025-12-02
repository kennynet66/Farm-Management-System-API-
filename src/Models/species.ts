import { model, Schema } from "mongoose";

const speciesSchema = new Schema({
    name: {
        type: String,
        required: [true, "Species name is required"]
    },
    description: {
        type: String,
        required: false
    },
    livestockTypeId: {
        type: String,
        required: [true, "Livestock type is required"]
    }
}, { timestamps: true });

export const species = model("Species", speciesSchema);