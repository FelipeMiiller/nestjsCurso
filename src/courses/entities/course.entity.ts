import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tag } from './tag.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @JoinTable({ name: 'courses_tags' })
  @ManyToMany(() => Tag, (tag: Tag) => tag.courses, { cascade: true })
  tags: Tag[];

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
