import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Match, MatchDocument } from "./schemas/match.schema";
import { DecksService } from "../decks/decks.service";


@Injectable()
export class MatchesService {
  constructor(
    @InjectModel(Match.name) private readonly matchModel: Model<MatchDocument>,
    private decksService: DecksService
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

  async findRankedWithoutArchetype(): Promise<Match[]> {
    return this.matchModel.find({
      "info.game_type": "Ranked",
      $or: [
        { "info.players.0.archetype": { $exists: false }},
        { "info.players.0.archetype": { $size: 0 }},
      ]
    })
    .limit(1000)
    .exec();
  }

  async setArchetypes(match: Match): Promise<Match> {
    for (const player of match.info.players) {
      const deck = this.decksService.convertToDeck(player.deck_code.toString());
      let champs = this.decksService.getChampions(deck);
      if (champs.length === 0) champs = [ "none" ];
      player.archetype = champs;
    }
    return match.save();
  }

}
