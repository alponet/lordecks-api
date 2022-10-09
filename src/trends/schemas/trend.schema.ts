import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type TrendDocument = Trend & Document;


@Schema()
export class Trend extends Document {
  @Prop()
  date: Date;

  @Prop([String])
  archetype: String[];

  @Prop()
  play_rate: Number;

  @Prop()
  win_rate: Number;
}

export const TrendSchema = SchemaFactory.createForClass(Trend);
