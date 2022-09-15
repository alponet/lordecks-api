import { Injectable } from '@nestjs/common';
import { Deck, getDeckFromCode } from "lor-deckcodes-ts";

@Injectable()
export class DecksService {
  constructor() {}

  async convertToDeck(deckcode: string): Promise<Array<any>> {
    return new Promise(resolve => {
      const decodedDeck: Deck = getDeckFromCode(deckcode);
      resolve(decodedDeck);
    })
  }
}
