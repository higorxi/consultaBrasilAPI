import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Preference {
  @PrimaryGeneratedColumn('uuid')
  id?: number;

  @Column()
  postoAtendimento: string;

  @Column()
  diaPreferencial1: Date;

  @Column()
  turnoPreferencial1: string;

  @Column()
  diaPreferencial2: Date;

  @Column()
  turnoPreferencial2: string;
}
