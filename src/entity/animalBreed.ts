import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AnimalCategory } from "./animalCategory.Entity";
import { Animal } from "./animal.Entity";

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

    @OneToMany(() => Animal, (animal) => animal.breed)
    animals!: Animal[]

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
}