import { MatchesService } from './matches.service';
import { Match } from './schemas/match.schema';
import { Body, Controller, Get, HttpStatus, Param, Post, Query, Res } from "@nestjs/common";
import { ApiQuery } from "@nestjs/swagger";

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
  @ApiQuery({ name: 'dateFrom', required: false })
  @ApiQuery({ name: 'dateTo', required: false })
  @ApiQuery({ name: 'minCount', required: false })
  async getArchetypes(
    @Query('dateFrom') dateFrom?: string,
    @Query('dateTo') dateTo?: string,
    @Query('minCount') minCount?: string
  ): Promise<string[][]> {
    return this.matchesService.getArchetypes(dateFrom, dateTo, minCount);
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
