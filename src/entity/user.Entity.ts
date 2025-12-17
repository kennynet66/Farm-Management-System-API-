import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Roles } from "./role.Entity";

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

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
}