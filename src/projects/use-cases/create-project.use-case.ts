import { Repository } from 'typeorm';
import { CreateProjectDto } from '../dto/create-project.dto';
import { Project, ProjectStatus } from '../entities/project.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CreateProjectUseCase {
  constructor(
    @InjectRepository(Project) // não esquecer de adicionar essa linha
    private readonly projectRepo: Repository<Project>,
  ) {}

  execute(input: CreateProjectDto) {
    const project = new Project(input);

    if (input.started_at) {
      project.status = ProjectStatus.Active;
    }

    return this.projectRepo.save(project);
  }
}
