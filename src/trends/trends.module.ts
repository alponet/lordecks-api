import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Trend, TrendSchema } from "./schemas/trend.schema";
import { TrendsController } from "./trends.controller";
import { TrendsService } from "./trends.service";
import { MatchesModule } from "../matches/matches.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Trend.name, schema: TrendSchema }]),
    MatchesModule
  ],
  controllers: [TrendsController],
  providers: [TrendsService],
  exports: [TrendsService]
})
export class TrendsModule {}
