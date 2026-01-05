import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Users } from "./user.Entity";
import { Animal } from "./animal.Entity";

@Entity()
export class Farms extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    farmName!: string

    @Column()
    county!: string

    @Column()
    subCounty!: string

    @Column()
    farmSize!: number

    @Column()
    yearEstablished!: Date

    @ManyToOne(() => Users, (user) => user.farms)
    @JoinColumn()
    manager!: Users

    @OneToMany(() => Animal, (animal) => animal.farm, { nullable: false })
    animals!: Animal[]

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date

    @Column({ default: false })
    isSystemDefault!: boolean
}