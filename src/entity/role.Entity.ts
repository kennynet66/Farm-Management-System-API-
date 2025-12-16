import { BaseEntity, Column, CreateDateColumn, Entity, ObjectId, ObjectIdColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Roles extends BaseEntity {
    @ObjectIdColumn()
    _id!: ObjectId

    @Column({ unique: true })
    key!: string

    @Column()
    name!: string

    @Column()
    description!: string

    @Column()
    permissions!: ObjectId[]

    @Column()
    isSystemDefault!: boolean

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}