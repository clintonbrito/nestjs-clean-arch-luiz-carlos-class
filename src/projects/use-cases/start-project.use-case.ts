import { InjectRepository } from '@nestjs/typeorm';
import { StartProjectDto } from '../dto/start-project.dto';
import { Project, ProjectStatus } from '../entities/project.entity';
import { Repository } from 'typeorm';

export class StartProjectUseCase {
  constructor(
    @InjectRepository(Project)
    private projectRepo: Repository<Project>,
  ) {}

  async execute(id: string, input: StartProjectDto) {
    const project = await this.projectRepo.findOneOrFail({ where: { id } });

    if (project.status === ProjectStatus.Active) {
      throw new Error('You cannot start an active project');
    }

    if (project.status === ProjectStatus.Completed) {
      throw new Error('You cannot start a completed project');
    }

    if (project.status === ProjectStatus.Cancelled) {
      throw new Error('You cannot start a cancelled project');
    }

    project.started_at = input.started_at;
    project.status = ProjectStatus.Active;

    return this.projectRepo.save(project);
  }
}
