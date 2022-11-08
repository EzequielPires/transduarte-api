import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum daysOfTheWeek {
    domingo = 'domingo',
    segunda = 'segunda',
    terca = 'terca',
    quarta = 'quarta',
    quinta = 'quinta',
    sexta = 'sexta',
    sabado = 'sabado',
}

@Entity()
export class OpeningHour {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({type: "simple-enum", enum: daysOfTheWeek})
    day: string;

    @Column({type: "time"})
    start: string;

    @Column({type: "time"})
    end: string;
}
