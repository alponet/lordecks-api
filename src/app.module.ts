import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MatchesModule } from './matches/matches.module';
import { DecksModule } from "./decks/decks.module";

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://USER:PASSWORD@URL/?retryWrites=true&w=majority',
      { dbname: 'DBNAME' },
    ),
    MatchesModule,
    DecksModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
