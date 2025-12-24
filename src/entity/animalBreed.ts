import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AnimalCategory } from "./animalCategory.Entity";

@Entity()
export class AnimalBreed extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column({ nullable: false })
    name!: string

    @Column()
    description!: string

    @Column({ nullable: false, default: false })
    isSystemDefault!: boolean

    @ManyToOne(() => AnimalCategory, { eager: true })
    animalCategory!: AnimalCategory

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
}