import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from './models/todo.model';
import { TodoRepository } from './repositories/todo.repository';
import { QueriesResolver } from './resolvers/queries.resolver';
import { MutationsResolver } from './resolvers/mutations.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }])
  ],
  providers: [TodoRepository, QueriesResolver, MutationsResolver]
})
export class TodoModule {
}
