import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Permissions } from "./permissions.Entity";
import { RoleLevels } from "../Types/auth.Types";

@Entity()
export class Roles extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column({ unique: true, enum: RoleLevels, default: RoleLevels.FARMMANAGER })
    key!: string

    @Column()
    name!: string

    @Column()
    description!: string

    @ManyToMany(() => Permissions, (permission) => permission.roles, { eager: true })
    @JoinTable()
    permissions!: Permissions[]

    @Column()
    isSystemDefault!: boolean

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}