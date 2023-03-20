import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Platform {
  //自增列
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  platform_name: string;
}
