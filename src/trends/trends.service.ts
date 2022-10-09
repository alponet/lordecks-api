import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { TrendDocument, Trend } from "./schemas/trend.schema";


@Injectable()
export class TrendsService {

  constructor(
    @InjectModel(Trend.name) private readonly trendsModel: Model<TrendDocument>
  ) { }


  async upsertTrends(date: Date, results: any[]): Promise<any> {
    date.setUTCHours(0,0,0,0);

    results.forEach(archetype => {
      this.trendsModel.updateOne(
        {
          date: date,
          archetype: archetype.archetype
        },
        {
          $set: {
            play_rate: archetype.playRate,
            win_rate: archetype.winRate
          }
        },
        {
          upsert: true
        }
      ).exec();
    });

    return Promise.resolve();
  }



  async getArchetypeTrends(archetype: string): Promise<Trend[]> {
    let today = new Date();
    let lastMonth = new Date(today);
    lastMonth.setDate(lastMonth.getDate() - 30);
    lastMonth.setUTCHours(0,0,0,0);

    return this.trendsModel.find({
      date: { $gte: lastMonth },
      archetype: archetype.split(",")
    })
    .sort({ date: 1})
    .exec();
  }

}
