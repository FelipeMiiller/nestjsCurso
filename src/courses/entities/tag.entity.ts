import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Course } from './course.entity';

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;

  @JoinTable()
  @ManyToMany(() => Course, (course: Course) => course.tags)
  courses: string[];
}
