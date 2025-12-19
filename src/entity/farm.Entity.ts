import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Users } from "./user.Entity";

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

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
}