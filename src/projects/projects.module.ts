import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
// import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ProjectsWithUseCaseController } from './projects-with-use-case.controller';
import { CreateProjectUseCase } from './use-cases/create-project.use-case';
import { FindAllProjectsUseCase } from './use-cases/find-all-projects.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  controllers: [
    // ProjectsController,
    ProjectsWithUseCaseController,
  ],
  providers: [ProjectsService, CreateProjectUseCase, FindAllProjectsUseCase],
})
export class ProjectsModule {}
