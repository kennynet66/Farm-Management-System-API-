import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Permissions } from "./permissions.Entity";

@Entity()
export class Roles extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column({ unique: true })
    key!: string

    @Column()
    name!: string

    @Column()
    description!: string

    @ManyToMany(() => Permissions, (permission) => permission.roles)
    @JoinTable()
    permissions!: Permissions[]

    @Column()
    isSystemDefault!: boolean

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}