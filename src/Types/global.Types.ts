export type Environments = "Development" | "Production";
export type IResponse = {
    success: boolean,
    message: string,
    data?: any
}

// export const Units =
//     ["acre", "hectare", "square meter", "square kilometer", "square foot", "square mile", "meter", "kilometer", "foot", "yard", "mile", "liter", "milliliter", "cubic meter", "gallon", "barrel", "gram", "kilogram", "tonne", "pound", "ounce", "stone", "bushel", "quintal", "bale", "head"];

export const Units = 
[ "Square meter", "Hectare", "Acre", "Square kilometer", "Square foot", "Square mile",
  "Meter", "Kilometer", "Foot", "Yard", "Mile",
  "Liter", "Milliliter", "Cubic meter", "Gallon", "Barrel", "Bushel",
  "Gram", "Kilogram", "Tonne", "Quintal", "Pound", "Ounce", "Stone", "Bale",
  "Head",
  "Piece", "Box", "Pack", "Unit", "Set" ]

export type TUnits =
    ["acre", "hectare", "square meter", "square kilometer", "square foot", "square mile", "meter", "kilometer", "foot", "yard", "mile", "liter", "milliliter", "cubic meter", "gallon", "barrel", "gram", "kilogram", "tonne", "pound", "ounce", "stone", "bushel", "quintal", "bale", "head"];
