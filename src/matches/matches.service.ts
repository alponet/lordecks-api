import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Match, MatchDocument } from './schemas/match.schema';

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
}
