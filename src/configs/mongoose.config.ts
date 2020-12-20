import { MongooseModuleOptions, MongooseOptionsFactory } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ConnectionError } from "../infrastructure/errors/database/connection-error";

interface EnvironmentVariables {
  DATABASE_HOST: string;
  DATABASE_PORT: number;
  DATABASE_NAME: string;
}

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>
  ) {
  }

  createMongooseOptions(): MongooseModuleOptions {
    const HOST = this.configService.get<string>("DATABASE_HOST");
    const PORT = this.configService.get<string>("DATABASE_PORT");
    const DB = this.configService.get<string>("DATABASE_NAME");
    const URI = `mongodb://${HOST}:${PORT}/${DB}`;

    if (!HOST || !PORT || !DB) {
      throw new ConnectionError(
        `Please check database connection parameters! Current uri: ${URI}`
      );
    }


    return {
      uri: URI,
      useFindAndModify: false
    };
  }
}
