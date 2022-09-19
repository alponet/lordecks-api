import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type MatchDocument = Match & Document;

// TODO: avoid _id on sub-schemas


@Schema()
export class MetadataSchema extends Document {
  @Prop()
  match_id: String;

  @Prop([String])
  participants: String[];
}

@Schema()
export class PlayerSchema extends Document {
  @Prop()
  puuid: String;

  @Prop()
  deck_code: String;

  @Prop([String])
  archetype: String[];

  @Prop()
  game_outcome: String;
}


@Schema()
export class InfoSchema extends Document {
  @Prop([PlayerSchema])
  players: PlayerSchema[];

  @Prop()
  game_type: String;
}


@Schema()
export class Match extends Document {
  @Prop()
  metadata: MetadataSchema;

  @Prop()
  info: InfoSchema;
}

export const MatchSchema = SchemaFactory.createForClass(Match);
