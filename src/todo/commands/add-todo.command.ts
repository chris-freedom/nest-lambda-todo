import { Field, InputType } from '@nestjs/graphql';
import { Status } from '../models/fields/status.field';

@InputType()
export class AddTodoCommand {
  @Field(() => String)
  label: string;

  @Field(() => String)
  description: string;

  @Field(() => Status)
  status: Status;
}
