import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { gender, livestockStatus } from "../Types/livestock.Types";
import { AnimalBreed } from "./animalBreed";

@Entity()
export class Animal extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column()
    tagNumber!: string;

    @Column({ enum: gender })
    sex!: string;

    @Column()
    birthDate!: Date

    @Column()
    weight!: number

    @Column({ enum: livestockStatus })
    status!: string;

    @Column()
    notes!: string

    @Column()
    productionType!: string

    @ManyToOne(() => AnimalBreed, { eager: true })
    @JoinColumn()
    breed!: AnimalBreed

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
}