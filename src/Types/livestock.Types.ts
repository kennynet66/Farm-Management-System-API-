export type T_Animal = {
    tagNumber: string;
    sex: "male" | "female";
    birthDate: Date;
    weight: string;
    status: "active" | "sold" | "dead" | "sick",
    notes?: string;
    breedId: string;
}

export type livestockTypes = {
    id: string,
    name: string,
    description?: string,
    isSystemDefault: boolean,
    defaultSpecies: {
        name: string,
        description?: string,
        livestockTypeId: string
    }[]
}