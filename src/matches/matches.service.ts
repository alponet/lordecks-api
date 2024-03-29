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


  getArchetypes(dateFrom?: string, dateTo?: string, minCount?: string): Promise<any[]> {
    const minimalCount = minCount ? parseInt(minCount) : 50;

    let dateFilter: { $gte?: any, $lt?: any } = {};
    if (dateFrom) dateFilter.$gte = new Date(dateFrom);
    if (dateTo) dateFilter.$lt = new Date(dateTo);

    return this.matchModel.aggregate([
      {
        $match: {
          "info.game_type": "Ranked",
          "info.players.archetype": { $exists: true },
          ...Object.keys(dateFilter).length ? { "date": dateFilter } : {}
        }
      },
      {
        $unwind: "$info.players"
      },
      {
        $group: {
          _id: "$info.players.archetype",
          count: { $sum: 1 },
          wins: {
            $sum: {
              $cond: [{ $eq: [ "$info.players.game_outcome", "win" ] }, 1, 0]
            }
          }
        }
      },
      {
        $match: {
          "count": {
            $gte: minimalCount
          }
        }
      }
    ])
    .sort({ "count": -1 })
    .exec();
  }


  getMatchesCount(dateFrom?: string, dateTo?: string): Promise<number> {
    let dateFilter: { $gte?: any, $lt?: any } = {};
    if (dateFrom) dateFilter.$gte = new Date(dateFrom);
    if (dateTo) dateFilter.$lt = new Date(dateTo);

    return this.matchModel.countDocuments({
      "info.players.archetype": { $exists: true },
      ...Object.keys(dateFilter).length ? { "date": dateFilter } : {}
    }).exec();
  }


  getPlayedDecks(archetype: string): Promise<string[][]> {
    const archetypeArray = archetype.split(",");

    return this.matchModel.aggregate([
      {
        $match: {
          "info.game_type": "Ranked",
          "info.players.archetype": { $exists: true },
        }
      },
      {
        $unwind: "$info.players"
      },
      {
        $match: {
          "info.players.archetype": archetypeArray
        }
      },
      {
        $group: {
          _id: "$info.players.deck_code",
          count: { $sum: 1 },
          wins: {
            $sum: {
              $cond: [{ $eq: [ "$info.players.game_outcome", "win" ] }, 1, 0]
            }
          }
        }
      },
      {
        $match: {
          "count": {
            $gt: 9
          }
        }
      }
    ])
    .sort({ "count": -1 })
    .exec();
  }

}
