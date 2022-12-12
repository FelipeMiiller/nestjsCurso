import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto/create-course.dto';
import { Course } from './entities/course.entity';
import { Tag } from './entities/tag.entity';

@Injectable()
export class CoursesService {
  constructor(
    @Inject('COURSES_REPOSITORY')
    private readonly courseRepository: Repository<Course>,

    @Inject('TAGS_REPOSITORY')
    private readonly tagRepository: Repository<Tag>,
  ) {}

  findAll() {
    return this.courseRepository.find({
      relations: ['tags'],
    });
  }

  async findOne(id: string) {
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: ['tags'],
    });

    if (!course) {
      throw new NotFoundException(`Course not found ${id}`);
    } else {
      return course;
    }
  }

  async create(createCourseDto: CreateCourseDto) {
    const tags = await Promise.all(
      createCourseDto.tags.map((name: string) => this.preloadTagByName(name)),
    );
    const course = this.courseRepository.create({ ...createCourseDto, tags });

    return this.courseRepository.save(course);
  }

  async update(id: string, updateCourseDto: any) {
    const tags =
      updateCourseDto &&
      (await Promise.all(
        updateCourseDto.tags.map((name: string) => this.preloadTagByName(name)),
      ));

    const course = await this.courseRepository.preload({
      id: id,
      ...updateCourseDto,
      tags,
    });

    if (!course) {
      throw new NotFoundException(`Course not found ${id}`);
    } else {
      return this.courseRepository.save(course);
    }
  }

  async remove(id: string) {
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: ['tags'],
    });

    if (!course) {
      throw new NotFoundException(`Course not found ${id}`);
    } else {
      return this.courseRepository.remove(course);
    }
  }

  private async preloadTagByName(name: string): Promise<Tag> {
    const tag = await this.tagRepository.findOne({
      where: { name },
    });

    if (tag) {
      return tag;
    } else {
      return this.tagRepository.create({ name });
    }
  }
}
