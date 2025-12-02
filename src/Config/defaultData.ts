import { livestockTypes } from "../Types/livestock.Types";

export const DefaultLivestockTypes: livestockTypes[] = [
    {
        id: "1",
        name: "Mammal",
        description: "",
        isSystemDefault: true,
        defaultSpecies: [
            {
                name: "Goat",
                description: "",
                livestockTypeId: "1"
            },
            {
                name: "Cattle",
                description: "",
                livestockTypeId: "1"
            },
            {
                name: "Chicken",
                description: "",
                livestockTypeId: "1"
            },
            {
                name: "Sheep",
                description: "",
                livestockTypeId: "1"
            },
            {
                name: "Pig",
                description: "",
                livestockTypeId: "1"
            },
            {
                name: "Camel",
                description: "",
                livestockTypeId: "1"
            },
            {
                name: "Rabbit",
                description: "",
                livestockTypeId: "1"
            },
            {
                name: "Horse",
                description: "",
                livestockTypeId: "1"
            }
        ]
    },
    {
        id: "2",
        name: "Birds",
        description: "",
        isSystemDefault: true,
        defaultSpecies: [

        ]
    },
    {
        id: "3",
        name: "Fish",
        description: "",
        isSystemDefault: true,
        defaultSpecies: [

        ]
    },
    {
        id: "4",
        name: "Insects",
        description: "",
        isSystemDefault: true,
        defaultSpecies: [

        ]
    },
]
