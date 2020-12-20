import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Document, Types } from 'mongoose';
import { Status } from './fields/status.field';

@ObjectType()
@Schema()
export class Todo {
  @Field(() => String)
  _id: Types.ObjectId;

  @Field(type => String)
  @Prop({ required: true })
  label: string;

  @Field(type => String)
  @Prop({ required: true })
  description: string;

  @Field(type => Status)
  @Prop({ required: true })
  status: Status;
}

export type TodoDocument = Todo & Document;

export const TodoSchema = SchemaFactory.createForClass(Todo);
