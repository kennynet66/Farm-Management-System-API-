import { Entity, Column, ObjectId, ObjectIdColumn, BaseEntity, CreateDateColumn, UpdateDateColumn, Index } from "typeorm"

@Entity()
export class Permissions extends BaseEntity {

    @ObjectIdColumn()
    _id!: ObjectId

    @Column()
    @Index({ unique: true })
    key!: string

    @Column()
    name!: string

    @Column()
    description!: string

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
}
