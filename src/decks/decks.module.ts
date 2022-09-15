import { Module } from '@nestjs/common';
import { DecksService } from "./decks.service";
import { DecksController } from "./decks.controller";

@Module({
  imports: [],
  controllers: [DecksController],
  providers: [DecksService],
})
export class DecksModule {}
