import { User } from "src/modules/user/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany } from "typeorm";

@Entity()
export class Service {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    name: string;

    @Column({type: "text"})
    description: string;

    @Column()
    duration: number;

    @CreateDateColumn()
    created_at: Date;

    @ManyToMany(() => User, user => user.services)
    providers: User[];
}
