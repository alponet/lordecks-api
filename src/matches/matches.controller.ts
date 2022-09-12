import { MatchesService } from './matches.service';
import { Match } from './schemas/match.schema';
import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';

@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

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

  @Get("one")
  async findOne(): Promise<Match> {
    return this.matchesService.findOne();
  }
}
