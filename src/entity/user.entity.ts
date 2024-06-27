import {
    BaseEntity,
    Entity,
    Unique,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeInsert,
    BeforeUpdate,
    JoinTable,
    ManyToMany,
  } from 'typeorm';
  import * as bcrypt from 'bcryptjs';
  import { BCRYPT_HASH_ROUND } from 'src/configs/general.config';
  import { Badge } from './badge.entity';

  @Entity()
  @Unique(['email'])
  export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ nullable: false, type: 'varchar', length: 200 })
    email: string;
  
    @Column({ nullable: false, type: 'varchar', length: 200 })
    name: string;

    @Column({ nullable: false, type: 'varchar', length: 200, default: '' })
    profileImageUrl: string; 
  
    @Column({ nullable: false, type: 'varchar', length: 20, default: 'common-user' })
    role: string;
  
    @Column({ nullable: false, default: true })
    status: boolean;
  
    @Column({ nullable: false })
    password: string;

    @ManyToMany(() => Badge)
    @JoinTable()
    badges: Badge[];
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

    @BeforeInsert()
  async beforeInsert?() {
    if (this.password)
      this.password = await bcrypt.hash(this.password, BCRYPT_HASH_ROUND);

    if (!this.email?.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {

      throw new Error('O campo email não está em um formato válido.');
    }
    this.email = this.email;
  }

  @BeforeUpdate()
  async beforeUpdate?() {
    if (this.password)
      this.password = await bcrypt.hash(this.password, BCRYPT_HASH_ROUND);

    if (!this.email?.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {

      throw new Error('O campo email não está em um formato válido.');
    }
    this.email = this.email;
  }
  }