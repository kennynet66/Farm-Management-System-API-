import { TUnits } from "./global.Types";

export type IInventoryItem = {
    itemName: string;
    category: "supplies" | "equipment" | "seeds";
    unit: TUnits;
    itemsInStock: number;
    purchaseDate: Date;
    value: number;
    currentStock: number;
    location: {
        locationName: string,
        locationDescription: string
    };
    minStock: number;
    maxStock: number;
}