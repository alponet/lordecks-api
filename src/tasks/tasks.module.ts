import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { MatchesModule } from "../matches/matches.module";
import { TrendsModule } from "../trends/trends.module";

@Module({
  providers: [TasksService],
  imports: [
    MatchesModule,
    TrendsModule
  ]
})
export class TasksModule {}
