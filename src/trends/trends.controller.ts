import { Controller, Get, Param } from "@nestjs/common";
import { TrendsService } from "./trends.service";


@Controller('trends')
export class TrendsController {

  constructor(
    private readonly trendsService: TrendsService
  ) {}


  @Get(":archetype")
  async getArchetypeTrends(@Param('archetype') archetype: string): Promise<any[]> {
    return this.trendsService.getArchetypeTrends(archetype);
  }

}
