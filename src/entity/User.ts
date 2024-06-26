import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

export enum UserRole {
    ADMIN = "admin",
    USER = "user",
    GHOST = "ghost",
}

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: true })
    firstName: string

    @Column({ nullable: true })
    lastName: string

    @Column({unique:true})
    email: string

    @Column()
    password: string

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.USER,
    })
    role: UserRole

}
