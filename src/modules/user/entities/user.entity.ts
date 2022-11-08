import { hashSync } from "bcrypt";
import { Service } from "src/modules/service/entities/service.entity";
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
    
    @Column()
    avatar: string;
    
    @Column()
    phone: string;

    @CreateDateColumn()
    create_at: Date;

    @ManyToMany(() => Service, service => service.providers)
    services: Service[];

    @BeforeInsert()
    hashPassword() {
        this.password = hashSync(this.password, 10);
    }
}
