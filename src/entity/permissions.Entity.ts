import { Entity, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, ManyToMany } from "typeorm"
import { Roles } from "./role.Entity"

@Entity()
export class Permissions extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column({ unique: true })
    key!: string

    @Column()
    name!: string

    @Column()
    description!: string

    @ManyToMany(() => Roles, (role) => role.permissions)
    roles!: Roles[];

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
}
