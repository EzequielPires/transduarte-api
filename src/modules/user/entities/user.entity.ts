import { hashSync } from "bcrypt";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany, BeforeInsert } from "typeorm";

@Entity()
export class User { 
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;
    
    @Column({nullable: true})
    avatar: string;
    
    @Column()
    phone: string;

    @CreateDateColumn()
    create_at: Date;

    @BeforeInsert()
    hashPassword() {
        this.password = hashSync(this.password, 10);
    }
}
