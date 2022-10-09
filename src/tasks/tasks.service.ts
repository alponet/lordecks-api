import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from "@nestjs/schedule";
import { MatchesService } from "../matches/matches.service";
import { TrendsService } from "../trends/trends.service";


@Injectable()
export class TasksService {

  constructor(
    private matchesService: MatchesService,
    private trendsService: TrendsService
  ) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  setArchetypes() {
    this.matchesService.findRankedWithoutArchetype().then(matches => {
      for (const match of matches) {
        this.matchesService.setArchetypes(match);
      }
    });
  }

  @Cron(CronExpression.EVERY_30_MINUTES)
  setArchetypeTrendsToday() {
    const today = new Date();
    this.setTrendsForDate(today);
  }


  @Cron(CronExpression.EVERY_6_HOURS)
  setArchetypeTrendsLastMonth() {
    for (let i = 1; i < 30; i++) {
      let day = new Date();
      day.setDate(day.getDate() - i);
      this.setTrendsForDate(day);
    }
  }


  setTrendsForDate(date: Date) {
    date.setUTCHours(0,0,0,0);

    let nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);

    this.matchesService.getMatchesCount(date.toISOString()).then(matchesCount => {
      this.matchesService.getArchetypes(date.toISOString(), nextDay.toISOString(), "1").then(archetypes => {
        const results = archetypes.map(archetype => {
          return {
            archetype: archetype._id,
            playRate: archetype.count / (matchesCount * 2),
            winRate: archetype.wins / archetype.count
          }
        });

        this.trendsService.upsertTrends(date, results).then(() => {
          console.log("trends update initiated for " + date);
        });
      });
    });
  }

}
