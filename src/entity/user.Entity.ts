import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Roles } from "./role.Entity";
import { Farms } from "./farm.Entity";

@Entity()
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ unique: true })
    userName!: string;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string

    @Column()
    email!: string;

    @Column()
    password!: string

    @ManyToOne(() => Roles, { eager: true })
    @JoinColumn()
    role!: Roles;

    @OneToMany(() => Farms, (farm) => farm.manager)
    farms!: Farms[]

    @Column({ default: false })
    isSystemDefault!: boolean;

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
}