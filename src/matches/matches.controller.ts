import { MatchesService } from './matches.service';
import { Match } from './schemas/match.schema';
import { Body, Controller, Get, HttpStatus, Param, Post, Res } from "@nestjs/common";

@Controller('matches')
export class MatchesController {
  constructor(
    private readonly matchesService: MatchesService
  ) {}

  @Post()
  async createMatch(@Res() response, @Body() match: Match) {
    const newMatch = await this.matchesService.create(match);
    return response.status(HttpStatus.CREATED).json({
      newMatch,
    });
  }

  @Get()
  async findAll(): Promise<Match[]> {
    return this.matchesService.findAll();
  }

  @Get("archetypes")
  async getArchetypes(): Promise<string[][]> {
    return this.matchesService.getArchetypes();
  }

  @Get("playedDecks/:archetype")
  async getPlayedDecks(@Param('archetype') archetype: string): Promise<string[][]> {
    return this.matchesService.getPlayedDecks(archetype);
  }

  @Get(":matchId")
  async find(@Param('matchId') matchId: string): Promise<Match> {
    return this.matchesService.find(matchId);
  }

}
