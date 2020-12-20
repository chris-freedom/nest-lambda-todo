import { Resolver, Args, Mutation, Int } from '@nestjs/graphql';
import { Todo } from '../models/todo.model';
import { TodoRepository } from '../repositories/todo.repository';
import { AddTodoCommand } from '../commands/add-todo.command';
import { EditTodoCommand } from '../commands/edit-todo.command';
import { Types } from 'mongoose';

@Resolver(of => Todo)
export class MutationsResolver {
  constructor(
    private _todoRepository: TodoRepository
  ) {
  }

  @Mutation(() => Todo)
  async editTodo(
    @Args('_id', { type: () => String }) _id: Types.ObjectId,
    @Args('payload') payload: EditTodoCommand
  ) {
    return this._todoRepository.edit(_id, payload);
  }

  @Mutation(() => Todo)
  async addTodo(@Args('payload') payload: AddTodoCommand) {
    return this._todoRepository.add(payload);
  }

  @Mutation(() => Todo)
  async removeTodo(
    @Args('_id', { type: () => String }) _id: Types.ObjectId
  ) {
    return this._todoRepository.remove(_id);
  }

  @Mutation(() => Boolean)
  async removeAll() {
    return this._todoRepository.removeAll();
  }
}
