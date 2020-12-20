import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { Todo } from '../models/todo.model';
import { TodoRepository } from '../repositories/todo.repository';
import { Types } from 'mongoose';

@Resolver(of => Todo)
export class QueriesResolver {
  constructor(
    private _todoRepository: TodoRepository
  ) {
  }

  @Query(returns => Todo, { name: 'todo' })
  async getTodo(
    @Args('_id', { type: () => String }) id: Types.ObjectId
  ) {
    return this._todoRepository.getById(id);
  }

  @Query(returns => [Todo], { name: 'todos' })
  async getTodos(
    @Args('first', { type: () => Int, nullable: true }) first?: number,
    @Args('offset', { type: () => Int, nullable: true }) offset?: number
  ) {
    return this._todoRepository.getAll(first, offset);
  }
}