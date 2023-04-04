import { Injectable, Scope } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AddBankStatementCommand, DeleteBankStatementCommand, DeleteManyBankStatementsCommand, GetBankStatementCommand, ListBankStatementsCommand, UpdateBankStatementCommand, UpdateManyBankStatementsCommand } from './bank-statement.command';
import { BankStatementDefaultRead, BankStatementListQuery, BankStatementUpdateDto, BankStatementWhere, BankStatementWhereOne, CreateBankStatementDto } from './bank-statement.dto';

@Injectable({ scope: Scope.REQUEST })
export class BankStatementService {

  constructor(private readonly commandBus: CommandBus) {}

  async list(query: BankStatementListQuery) {
    return this.commandBus.execute<ListBankStatementsCommand, BankStatementDefaultRead[]>(
      new ListBankStatementsCommand(query)
    );
  }

  async get(where: BankStatementWhereOne) {
    return this.commandBus.execute<GetBankStatementCommand, BankStatementDefaultRead>(
      new GetBankStatementCommand(where)
    );
  }

  async create(data: CreateBankStatementDto) {
    return this.commandBus.execute<AddBankStatementCommand, BankStatementDefaultRead>(
      new AddBankStatementCommand({entityAccount: { create: data.entityAccount }})
    );
  }
  
  async update(where: BankStatementWhereOne, data: BankStatementUpdateDto) {
    return this.commandBus.execute<UpdateBankStatementCommand, BankStatementDefaultRead>(
      new UpdateBankStatementCommand(where, data)
    );
  }

  async updateMany(where: BankStatementWhere, data: BankStatementUpdateDto) {
    return this.commandBus.execute<UpdateManyBankStatementsCommand, BankStatementDefaultRead[]>(
      new UpdateManyBankStatementsCommand(where, data)
    );
  }

  async delete(id: number) {
    return this.commandBus.execute<DeleteBankStatementCommand, BankStatementDefaultRead>(
      new DeleteBankStatementCommand(id)
    );
  }

  async deleteMany(where: BankStatementWhere) {
    return this.commandBus.execute<DeleteManyBankStatementsCommand, BankStatementDefaultRead[]>(
      new DeleteManyBankStatementsCommand(where)
    );
  }
}

