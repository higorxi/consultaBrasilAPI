import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Preference } from './preferences.entity';
import { PersonalInfo } from './personalinfo.entity';
import { Payment } from './payment.entity';

@Entity()
export class Scheduling {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Preference)
  @JoinColumn()
  preference: Preference;

  @OneToOne(() => PersonalInfo)
  @JoinColumn()
  personalInfo: PersonalInfo;

  @OneToOne(() => Payment)
  @JoinColumn()
  payment: Payment;
}
