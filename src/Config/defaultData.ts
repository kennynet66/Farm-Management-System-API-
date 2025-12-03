import { livestockTypes } from "../Types/livestock.Types";

export const DefaultLivestockTypes: livestockTypes[] = [
    {
        name: "Mammal",
        description: "",
        isSystemDefault: true,
        defaultSpecies: [
            {
                name: "Cattle",
                description: "",
                defaultBreeds: [
                    { name: "Friesian/Holstein", description: "", productionType: "Dairy" },
                    { name: "Jersey", description: "", productionType: "Dairy" },
                    { name: "Ayrshire", description: "", productionType: "Dairy" },
                    { name: "Guernsey", description: "", productionType: "Dairy" },
                    { name: "Angus", description: "", productionType: "Beef" },
                    { name: "Hereford", description: "", productionType: "Beef" },
                    { name: "Brahman", description: "", productionType: "Beef" },
                    { name: "Simmental", description: "", productionType: "Dual Purpose" },
                    { name: "Charolais", description: "", productionType: "Beef" },
                ]
            },
            {
                name: "Goats",
                description: "",
                defaultBreeds: [
                    { name: "Saanen", description: "", productionType: "Dairy" },
                    { name: "Toggenburg", description: "", productionType: "Dairy" },
                    { name: "Alpine", description: "", productionType: "Dairy" },
                    { name: "Boer", description: "", productionType: "Meat" },
                    { name: "Kalahari Red", description: "", productionType: "Meat" },
                    { name: "Galla", description: "", productionType: "Dual Purpose" },
                    { name: "Nubian", description: "", productionType: "Dual Purpose" }
                ]
            },
            {
                name: "Sheep",
                description: "",
                defaultBreeds: [
                    { name: "Dorper", description: "", productionType: "Meat" },
                    { name: "Merino", description: "", productionType: "Wool" },
                    { name: "Suffolk", description: "", productionType: "Meat" },
                    { name: "Hampshire", description: "", productionType: "Meat" },
                    { name: "East Friesian", description: "", productionType: "Milk" },
                    { name: "Red Maasai", description: "", productionType: "Meat" }
                ]
            },
            {
                name: "Pigs",
                description: "",
                defaultBreeds: [
                    { name: "Large White", description: "", productionType: "Meat" },
                    { name: "Landrace", description: "", productionType: "Meat" },
                    { name: "Duroc", description: "", productionType: "Meat" },
                    { name: "Hampshire", description: "", productionType: "Meat" },
                    { name: "Pietrain", description: "", productionType: "Meat" }
                ]
            },
            {
                name: "Camels",
                description: "",
                defaultBreeds: [
                    { name: "Dromedary", description: "", productionType: "Milk" },
                    { name: "Bactrian", description: "", productionType: "Draft" },
                    { name: "Somali Camel", description: "", productionType: "Milk" }
                ]
            },
            {
                name: "Rabbit",
                description: "",
                defaultBreeds: [
                    { name: "New Zealand White", description: "", productionType: "Meat" },
                    { name: "Californian", description: "", productionType: "Meat" },
                    { name: "Flemish Giant", description: "", productionType: "Meat" },
                    { name: "Rex", description: "", productionType: "Fur" }
                ]
            },
            {
                name: "Horses",
                description: "",
                defaultBreeds: [
                    { name: "Arabian", description: "", productionType: "Riding" },
                    { name: "Thoroughbred", description: "", productionType: "Racing" },
                    { name: "Quarter Horse", description: "", productionType: "Work" },
                    { name: "Friesian", description: "", productionType: "Draft" }
                ]
            },
            {
                name: "Donkeys",
                description: "",
                defaultBreeds: [
                    { name: "Standard Donkey", description: "", productionType: "Draft" },
                    { name: "Miniature Donkey", description: "", productionType: "Companion" },
                    { name: "Mammoth Donkey", description: "", productionType: "Draft" }
                ]
            },
        ]
    },
    {
        name: "Birds",
        description: "",
        isSystemDefault: true,
        defaultSpecies: [
            {
                name: "Chicken",
                description: "",
                defaultBreeds: [
                    { name: "Cobb 500", description: "", productionType: "Meat" },
                    { name: "Ross 308", description: "", productionType: "Meat" },
                    { name: "ISA Brown", description: "", productionType: "Eggs" },
                    { name: "Lohmann Brown", description: "", productionType: "Eggs" },
                    { name: "Kuroiler", description: "", productionType: "Dual Purpose" },
                    { name: "Sasso", description: "", productionType: "Dual Purpose" }
                ]
            },
            {
                name: "Ducks",
                description: "",
                defaultBreeds: [
                    { name: "Pekin", description: "", productionType: "Meat" },
                    { name: "Muscovy", description: "", productionType: "Meat" },
                    { name: "Khaki Campbell", description: "", productionType: "Eggs" },
                    { name: "Indian Runner", description: "", productionType: "Eggs" }
                ]
            },
            {
                name: "Turkeys",
                description: "",
                defaultBreeds: [
                    { name: "Broad Breasted White", description: "", productionType: "Meat" },
                    { name: "Broad Breasted Bronze", description: "", productionType: "Meat" },
                    { name: "Bourbon Red", description: "", productionType: "Meat" }
                ]
            },
            {
                name: "Geese",
                description: "",
                defaultBreeds: [
                    { name: "Embden", description: "", productionType: "Meat" },
                    { name: "Toulouse", description: "", productionType: "Meat" },
                    { name: "Chinese Goose", description: "", productionType: "Eggs" }
                ]
            },
            {
                name: "Guinea Fowl",
                description: "",
                defaultBreeds: [
                    { name: "Pearl", description: "", productionType: "Meat" },
                    { name: "Lavender", description: "", productionType: "Meat" }
                ]
            },
            {
                name: "Quail",
                description: "",
                defaultBreeds: [
                    { name: "Japanese (Coturnix)", description: "", productionType: "Eggs" },
                    { name: "Jumbo Coturnix", description: "", productionType: "Meat" },
                    { name: "Bobwhite", description: "", productionType: "Meat" }
                ]
            },
            {
                name: "Pigeons/Doves",
                description: "",
                defaultBreeds: [
                    { name: "King Pigeon", description: "", productionType: "Meat" },
                    { name: "Utility Carneau", description: "", productionType: "Meat" },
                    { name: "Homing Pigeon", description: "", productionType: "Racing" }
                ]
            },
            {
                name: "Ostriches",
                description: "",
                defaultBreeds: [
                    { name: "African Black", description: "", productionType: "Meat" },
                    { name: "Blue-neck", description: "", productionType: "Meat" },
                    { name: "Red-neck", description: "", productionType: "Meat" }
                ]
            },
            {
                name: "Emu",
                description: "",
                defaultBreeds: [
                    { name: "Common Emu", description: "", productionType: "Meat" }
                ]
            },

        ]
    },
    {
        name: "Aquatic",
        description: "",
        isSystemDefault: true,
        defaultSpecies: [
            {
                name: "Tilapia",
                description: "",
                defaultBreeds: [
                    { name: "Nile Tilapia", description: "", productionType: "Meat" },
                    { name: "Red Tilapia", description: "", productionType: "Meat" },
                    { name: "GIFT Strain", description: "", productionType: "Meat" }
                ]
            },
            {
                name: "Catfish",
                description: "",
                defaultBreeds: [
                    { name: "African Catfish", description: "", productionType: "Meat" },
                    { name: "Channel Catfish", description: "", productionType: "Meat" },
                    { name: "Hybrid Catfish", description: "", productionType: "Meat" }
                ]
            },
            {
                name: "Trout",
                description: "",
                defaultBreeds: [
                    { name: "Rainbow Trout", description: "", productionType: "Meat" },
                    { name: "Brown Trout", description: "", productionType: "Meat" }
                ]
            },
            {
                name: "Salmon",
                description: "",
                defaultBreeds: [
                    { name: "Atlantic Salmon", description: "", productionType: "Meat" },
                    { name: "Coho Salmon", description: "", productionType: "Meat" },
                ]
            },
            {
                name: "Carp",
                description: "",
                defaultBreeds: [
                    { name: "Common Carp", description: "", productionType: "Meat" },
                    { name: "Grass Carp", description: "", productionType: "Meat" },
                    { name: "Silver Carp", description: "", productionType: "Meat" }
                ]
            },
            {
                name: "Prawns/Shrimp",
                description: "",
                defaultBreeds: [
                    { name: "Pacific White Shrimp", description: "", productionType: "Meat" },
                    { name: "Giant Tiger Prawn", description: "", productionType: "Meat" }
                ]
            },
            {
                name: "Crayfish",
                description: "",
                defaultBreeds: [
                    { name: "Red Swamp Crayfish", description: "", productionType: "Meat" },
                    { name: "Australian Red Claw", description: "", productionType: "Meat" }
                ]
            },
            {
                name: "Oysters",
                description: "",
                defaultBreeds: [
                    { name: "Pacific Oyster", description: "", productionType: "Meat" },
                    { name: "Eastern Oyster", description: "", productionType: "Meat" }
                ]
            },
            {
                name: "Mussels",
                description: "",
                defaultBreeds: [
                    { name: "Blue Mussel", description: "", productionType: "Meat" },
                    { name: "Green Lipped Mussel", description: "", productionType: "Meat" }
                ]
            },
        ]
    },
    {
        name: "Insects",
        description: "",
        isSystemDefault: true,
        defaultSpecies: [
            {
                name: "Honey Bees",
                description: "",
                defaultBreeds: [
                    { name: "Italian Bee", description: "", productionType: "Honey" },
                    { name: "Carniolan Bee", description: "", productionType: "Honey" },
                    { name: "Africanized Bee", description: "", productionType: "Honey" },
                    { name: "Buckfast Bee", description: "", productionType: "Honey" }
                ]
            },
            {
                name: "Silkworms",
                description: "",
                defaultBreeds: [
                    { name: "Mulberry Silkworm", description: "", productionType: "Silk" },
                    { name: "Eri Silkworm", description: "", productionType: "Silk" },
                    { name: "Tasar Silkworm", description: "", productionType: "Silk" }
                ]
            },
            {
                name: "Black Soldier Fly",
                description: "",
                defaultBreeds: [
                    { name: "Commercial BSF Strain", description: "", productionType: "Protein" },
                    { name: "High Protein BSF Strain", description: "", productionType: "Protein" }
                ]
            },
            {
                name: "Crickets",
                description: "",
                defaultBreeds: [
                    { name: "House Cricket", description: "", productionType: "Protein" },
                    { name: "Banded Cricket", description: "", productionType: "Protein" }
                ]
            },
            {
                name: "Waxworms",
                description: "",
                defaultBreeds: [
                    { name: "Greater Waxworm", description: "", productionType: "Protein" },
                    { name: "Lesser Waxworm", description: "", productionType: "Protein" }
                ]
            },
            {
                name: "Locusts",
                description: "",
                defaultBreeds: [
                    { name: "Migratory Locust", description: "", productionType: "Protein" }
                ]
            },
            {
                name: "Mealworms",
                description: "",
                defaultBreeds: [
                    { name: "Yellow Mealworm", description: "", productionType: "Protein" },
                    { name: "Giant Mealworm", description: "", productionType: "Protein" }
                ]
            },
        ]
    },
];
