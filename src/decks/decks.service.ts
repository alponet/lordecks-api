import { Injectable } from "@nestjs/common";
import { Deck, getDeckFromCode } from "lor-deckcodes-ts";
import * as CHAMPIONS from "./champions.json";


@Injectable()
export class DecksService {
  constructor() {}

  convertToDeck(deckcode: string): Deck {
    return getDeckFromCode(deckcode);
  }

  getChampions(deck: Deck): string[] {
    const champs = CHAMPIONS.map(i => i.cardCode);
    return deck.filter(i => champs.includes(i.cardCode)).map(i => i.cardCode).sort();
  }
}
