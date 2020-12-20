import { GqlModuleOptions, GqlOptionsFactory } from "@nestjs/graphql";
import { Injectable } from "@nestjs/common";
import { join } from "path";
import { ConfigService } from "@nestjs/config";

type envBoolType = "0" | "1";

interface EnvironmentVariables {
  GRAPHQL_SCHEMA_PATH: string;
  GRAPHQL_DEBUG: boolean;
  GRAPHQL_PLAYGROUND: boolean;
}

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  private static readonly DEFAULT_PATH = "src/schema.gql";
  private static readonly DEFAULT_DEBUG = true;
  private static readonly DEFAULT_PLAYGROUND = true;

  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>
  ) {
  }

  createGqlOptions(): GqlModuleOptions {
    const PATH = this.configService.get<string>("GRAPHQL_SCHEMA_PATH");
    const DEBUG = this.configService.get<envBoolType>("GRAPHQL_DEBUG");
    const PLAYGROUND = this.configService.get<envBoolType>("GRAPHQL_PLAYGROUND");

    return {
      autoSchemaFile: PATH ? join(process.cwd(), PATH) : GqlConfigService.DEFAULT_PATH,
      debug: DEBUG ? !!Number.parseInt(DEBUG) : GqlConfigService.DEFAULT_DEBUG,
      playground: PLAYGROUND ? !!Number.parseInt(PLAYGROUND) : GqlConfigService.DEFAULT_PLAYGROUND
    };
  }
}
