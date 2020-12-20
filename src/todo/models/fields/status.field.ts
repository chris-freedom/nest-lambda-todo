import { registerEnumType } from '@nestjs/graphql';

export enum Status {
  ALL,
  ACTIVE,
  COMPLETED,
}

registerEnumType(Status, {
  name: 'Status'
});
