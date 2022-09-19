import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';
import { MatchesModule } from './matches/matches.module';
import { DecksModule } from "./decks/decks.module";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://USER:PASSWORD@URL/?retryWrites=true&w=majority',
      { dbname: 'DBNAME' },
    ),
    ScheduleModule.forRoot(),
    TasksModule,
    MatchesModule,
    DecksModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
