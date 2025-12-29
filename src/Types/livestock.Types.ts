export type T_Animal = {
    tagNumber: string;
    sex: "male" | "female";
    birthDate: Date;
    weight: number;
    status: livestockStatus,
    notes?: string;
    breedId: string;
    productionType: string;
    farm: string
}

export type livestockTypes = {
    name: string,
    description?: string,
    isSystemDefault: boolean,
    defaultSpecies: {
        name: string,
        description?: string
        defaultBreeds: {
            name: string,
            description: string,
            productionType: string
        }[]
    }[],
}

export enum gender {
    male = "male",
    female = "female"
}

export enum livestockStatus {
    active = "active",
    sold = "sold",
    dead = "dead",
    sick = "sick"
}

export type TBreed = {
    name: string,
    description?: string
    animalCategory: string
    isSystemDefault: boolean
}

export type TAnimalCategory = {
    name: string,
    description?: string
    isSystemDefault: boolean
}