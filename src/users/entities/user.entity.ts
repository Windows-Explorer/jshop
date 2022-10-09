import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id?: number

    @Column({ length: 255, type: "varchar" })
    username: string

    @Column({ length: 255, type: "varchar" })
    email: string

    @Column({ length: 255, type: "varchar" })
    passwordHash: string
}