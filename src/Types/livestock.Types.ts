export type T_Animal = {
    name: string;
    animalType: string;
    breed?: string;
    age: number;
    sex: "male" | "female";
    lastCheckup: Date;
}