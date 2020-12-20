import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Todo, TodoDocument } from '../models/todo.model';
import { AddTodoCommand } from '../commands/add-todo.command';
import { EditTodoCommand } from '../commands/edit-todo.command';

@Injectable()
export class TodoRepository {
  constructor(
    @InjectModel(Todo.name) private _todoModel: Model<TodoDocument>
  ) {
  }

  getById(_id: Types.ObjectId) {
    return this._todoModel.findById(_id).exec();
  }

  getAll(first: number | undefined, offset: number | undefined) {
    let  findQuery = this._todoModel.find();
    if (offset) findQuery = findQuery.skip(offset);
    if (first) findQuery = findQuery.limit(first);

    return findQuery.exec();
  }

  add(payload: AddTodoCommand) {
    const todo = new this._todoModel(payload);
    return todo.save();
  }

  edit(_id: Types._ObjectId, payload: EditTodoCommand) {
    return this._todoModel.findByIdAndUpdate(_id, payload, { new: true }).exec();
  }

  remove(_id: Types.ObjectId) {
    return this._todoModel.findByIdAndDelete(_id).exec();
  }

  async removeAll() {
    await this._todoModel.deleteMany().exec();
    return true;
  }
}
