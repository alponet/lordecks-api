import { DecksService } from './decks.service';
import { Body, Controller, Get, Param, Post } from "@nestjs/common";


@Controller('decks')
export class DecksController {

  constructor(private decksService: DecksService) {}


  @Get('byCode/:deckcode')
  async getDeckFromCode(@Param('deckcode') deckcode: string): Promise<any[]> {
    return this.decksService.convertToDeck(deckcode);
  }


  @Post('cardError')
  reportCardError(@Body() body: { cardCode: string }): void {
    console.error("cardError posted: " + body.cardCode);
  }

}
