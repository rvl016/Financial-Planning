import { IEvent } from "@nestjs/cqrs";

export enum EntityEventType {
  Created,
  Read,
  Modified
}

export class EntityEvent<T> implements IEvent {
  constructor(
    readonly type: EntityEventType,
    readonly data: T
  ) {}
}