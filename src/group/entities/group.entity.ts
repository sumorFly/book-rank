import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Group {
  //自增列
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  group: string;
  @Column()
  group_name: string;
  @Column()
  platform: number;
}
