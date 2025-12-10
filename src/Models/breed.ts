import { model, Schema } from "mongoose";

const breedSchema = new Schema({
    name: {
        type: String,
        required: [true, "Breed name is required"]
    },
    description: {
        type: String,
        required: false
    },
    productionType: {
        type: String,
        required: true
    },
    speciesId: {
        type: Schema.Types.ObjectId,
        ref: "Species",
        required: [true, "Species type is required"]
    }
}, { timestamps: true })

export const breed = model("Breed", breedSchema);