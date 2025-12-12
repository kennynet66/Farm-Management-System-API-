import { BaseEntity, Column, CreateDateColumn, Entity, ObjectId, ObjectIdColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Roles extends BaseEntity {
    @ObjectIdColumn()
    _id: ObjectId

    @Column({ unique: true })
    key: string

    @Column()
    name: string

    @Column()
    description: string

    @ObjectIdColumn()
    permissions: ObjectId[]

    @Column()
    isSystemDefault: boolean

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    constructor(_id: ObjectId, key: string, name: string, description: string, permissions: ObjectId[], isSystemDefault: boolean, createdAt: Date, updatedAt: Date) {
        super();
        this._id = _id;
        this.key = key;
        this.name = name;
        this.description = description;
        this.permissions = permissions;
        this.isSystemDefault = isSystemDefault;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}