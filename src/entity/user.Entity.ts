import { BaseEntity, Column, CreateDateColumn, Entity, Index, ObjectId, ObjectIdColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Users extends BaseEntity {
    @ObjectIdColumn()
    _id!: ObjectId;

    @Column()
    @Index({ unique: true })
    userName!: string;

    @Column()
    email!: string;

    @Column()
    password!: string

    @Column('ObjectId')
    role!: ObjectId;

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
}