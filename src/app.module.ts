import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';
import { MatchesModule } from './matches/matches.module';
import { DecksModule } from "./decks/decks.module";
import { ScheduleModule } from "@nestjs/schedule";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ ConfigModule ],
      useFactory: async (config: ConfigService) => ({
        uri: config.get('DB_URI'),
      }),
      inject: [ ConfigService ]
    }),
    ScheduleModule.forRoot(),
    TasksModule,
    MatchesModule,
    DecksModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
