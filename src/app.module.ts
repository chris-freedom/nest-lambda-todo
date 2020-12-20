import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MongooseConfigService } from './configs/mongoose.config';
import { GqlConfigService } from './configs/graphql.config';
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
      })
    }),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService
    }),
    GraphQLModule.forRootAsync({
      useClass: GqlConfigService
    }),
    TodoModule
  ]
})
export class AppModule {
}
