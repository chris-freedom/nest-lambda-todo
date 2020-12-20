import { Field, InputType } from '@nestjs/graphql';
import { Status } from '../models/fields/status.field';

@InputType()
export class EditTodoCommand {
  @Field(() => String, { nullable: true })
  label?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Status, { nullable: true })
  status?: Status;
}
