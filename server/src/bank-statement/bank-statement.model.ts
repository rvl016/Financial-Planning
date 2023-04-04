import { Inject, Injectable, Scope } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import { IBankStatementRepository } from './bank-statement.repository';
import { BankStatementCreateDto, BankStatementDefaultRead, BankStatementListQuery, BankStatementUpdateDto, BankStatementWhere, BankStatementWhereOne } from './bank-statement.dto';
import { EntityEvent, EntityEventType } from '../../src/core/models';
import { Injectables } from './bank-statement.module';

@Injectable({ scope: Scope.TRANSIENT })
export class BankStatementModel extends AggregateRoot<EntityEvent<IBankStatementEvent>> {

  constructor(
    @Inject("IBankStatementRepository") private readonly repository: IBankStatementRepository,
  ) {
    super();
  }

  async create(data: BankStatementCreateDto) {
    const record = await this.repository.create(data);
    this.apply(new BankStatementCreateEvent({records: [record]}));
    return record;
  }

  async list(query: BankStatementListQuery) {
    const records = await this.repository.getMany(query);
    this.apply(new BankStatementReadEvent({records}));
    return records;
  }

  async get(where: BankStatementWhereOne) {
    const records = [await this.repository.get(where)];
    this.apply(new BankStatementReadEvent({records}));
    return records;
  }
  
  async update(where: BankStatementWhereOne, data: BankStatementUpdateDto) {
    const records = [await this.repository.update(where, data)];
    this.apply(new BankStatementModifyEvent({records}));
    return records[0];
  }
  
  async updateMany(where: BankStatementWhere, data: BankStatementUpdateDto) {
    const records = await this.repository.updateMany(where, data);
    this.apply(new BankStatementModifyEvent({records}));
    return records;
  }
  
  async deleteWithId(id: number) {
    const deleted = await this.repository.delete({id});
    this.apply(new BankStatementDeleteEvent({ids: [id]}));
    return deleted;
  }
  
  async deleteWhere(where: BankStatementWhere) {
    const deleted = await this.repository.deleteMany(where);
    if (deleted.length > 0) this.apply(new BankStatementDeleteEvent({
      ids: deleted.map(v => v.id)
    }));
    return deleted;
  }
}

interface IBankStatementEvent {}

interface BankStatementReadEventData {
  records: BankStatementDefaultRead[],
}

export class BankStatementReadEvent 
  extends EntityEvent<BankStatementReadEventData> implements IBankStatementEvent 
{
  constructor(data: BankStatementReadEventData) { super(EntityEventType.Read, data); }
}

interface BankStatementCreateEventData {
  records: BankStatementDefaultRead[],
}

export class BankStatementCreateEvent 
  extends EntityEvent<BankStatementCreateEventData> implements IBankStatementEvent 
{
  constructor(data: BankStatementCreateEventData) { super(EntityEventType.Created, data); }
}

interface BankStatementUpdateEventData {
  records: BankStatementDefaultRead[],
}

export class BankStatementModifyEvent 
  extends EntityEvent<BankStatementUpdateEventData> implements IBankStatementEvent 
{
  constructor(data: BankStatementUpdateEventData) { super(EntityEventType.Modified, data); }
}

interface BankStatementDeleteEventData {
  ids: number[]
}

export class BankStatementDeleteEvent 
  extends EntityEvent<BankStatementDeleteEventData> implements IBankStatementEvent 
{
  constructor(data: BankStatementDeleteEventData) { super(EntityEventType.Read, data); }
}


