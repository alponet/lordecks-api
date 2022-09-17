import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { Match, MatchDocument } from "./schemas/match.schema";

@Injectable()
export class MatchesService {
  constructor(
    @InjectModel(Match.name) private readonly matchModel: Model<MatchDocument>,
  ) {}

  async create(match: Match): Promise<Match> {
    const newMatch = new this.matchModel(match);
    return newMatch.save();
  }

  async findAll(): Promise<Match[]> {
    return this.matchModel.find().limit(20).exec();
  }

  async findOne(): Promise<Match> {
    return this.matchModel.findOne().exec();
  }

  async find(matchId: string): Promise<Match> {
    return this.matchModel.findOne({ "metadata.match_id": matchId });
  }

  async setArchetypes(match: Match, archetypes: string[][]): Promise<Match> {
    for (let i = 0; i < archetypes.length; i++) {
      match.info.players[i].archetype = archetypes[i];
    }
    return match.save();
  }

}
