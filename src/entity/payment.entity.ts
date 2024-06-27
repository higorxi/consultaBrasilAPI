import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
  } from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id?: number;

  @Column()
  amount: string;

  @Column()
  paymentStatus: string;

  @Column()
  transactionId: string;

  @Column()
  debtorName: string;

  @Column()
  debtorDocument: string;

  @Column()
  additionalInformationValue: string;
}