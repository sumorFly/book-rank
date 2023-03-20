import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
  //自增列
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  book_name: string;
  @Column()
  read_count: number;
  @Column()
  author: string;
  @Column()
  creation_status: number;
  @Column()
  current_pos: number;
  @Column()
  group: string;
  @Column()
  group_name: string;
  @Column()
  rank_date: Date;
}
