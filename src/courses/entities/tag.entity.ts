import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Course } from './course.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;

  @JoinTable()
  @ManyToMany(() => Course, (course: Course) => course.tags)
  courses: string[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @BeforeInsert()
  genetatedId() {
    if (this.id) {
      return;
    } else {
      this.id = uuidv4();
    }
  }
}
