import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { MatchesModule } from "../matches/matches.module";

@Module({
  providers: [TasksService],
  imports: [MatchesModule]
})
export class TasksModule {}
