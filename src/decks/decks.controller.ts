import { DecksService } from './decks.service';
import { Controller, Get, Param } from "@nestjs/common";


@Controller('decks')
export class DecksController {
  constructor(private decksService: DecksService) {}

  @Get('byCode/:deckcode')
  async getDeckFromCode(@Param('deckcode') deckcode: string): Promise<any[]> {
    return this.decksService.convertToDeck(deckcode);
  }

}
