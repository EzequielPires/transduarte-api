import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum Month {
    janeiro = 0,
    fevereiro = 1,
    marco = 2,
    abril = 3,
    maio = 4,
    junho = 5,
    julho = 6,
    agosto = 7,
    setembro = 8,
    outubro = 9,
    novembro = 10,
    dezembro = 11
}

@Entity()
export class Transparency {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    year: number;

    @Column()
    month: number;

    @Column()
    total_trip: number;
    
    @Column()
    total_passengers: number;
    
    @Column()
    total_free: number;

    @Column()
    total_mileage: number;    

    @Column({nullable: true})
    file: string;

    @CreateDateColumn()
    created_at: Date;
}
