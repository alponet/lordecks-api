import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from "@nestjs/schedule";
import { MatchesService } from "../matches/matches.service";


@Injectable()
export class TasksService {

  constructor(private matchesService: MatchesService) {
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  setArchetypes() {
    this.matchesService.findRankedWithoutArchetype().then(matches => {
      for (const match of matches) {
        this.matchesService.setArchetypes(match);
      }
    })
  }
}
