import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MatchDocument = Match & Document;

@Schema()
export class Match {
  @Prop()
  _id: string;
}

export const MatchSchema = SchemaFactory.createForClass(Match);
