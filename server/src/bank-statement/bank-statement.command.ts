import { CommandHandler, EventPublisher, ICommand, ICommandHandler } from "@nestjs/cqrs";
import { Prisma } from "@prisma/client";
import { BankStatementModel } from "./bank-statement.model";
import { BankStatementCreateDto, BankStatementListQuery, BankStatementUpdateDto, BankStatementWhere, BankStatementWhereOne } from "./bank-statement.dto";

export class AddBankStatementCommand implements ICommand {
  constructor(readonly data: BankStatementCreateDto) {}
}

@CommandHandler(AddBankStatementCommand)
export class AddBankStatementHandler implements ICommandHandler<AddBankStatementCommand> {

  constructor(
    private readonly publisher: EventPublisher,  
    private readonly model: BankStatementModel
  ) {}

  async execute(command: AddBankStatementCommand) {
    const result = await this.model.create(command.data);
    this.publisher.mergeObjectContext(this.model).commit();
    return result;
  }
}

export class UpdateBankStatementCommand implements ICommand {
  constructor(
    readonly where: BankStatementWhereOne, 
    readonly data: BankStatementUpdateDto
  ) {}
}

@CommandHandler(UpdateBankStatementCommand)
export class UpdateBankStatementHandler implements ICommandHandler<UpdateBankStatementCommand> {

  constructor(
    private readonly publisher: EventPublisher,  
    private readonly model: BankStatementModel
  ) {}

  async execute(command: UpdateBankStatementCommand) {
    const result = await this.model.update(command.where, command.data);
    this.publisher.mergeObjectContext(this.model).commit();
    return result;
  }
}

export class UpdateManyBankStatementsCommand implements ICommand {
  constructor(
    readonly where: BankStatementWhere, 
    readonly data: BankStatementUpdateDto
  ) {}
}

@CommandHandler(UpdateManyBankStatementsCommand)
export class UpdateManyBankStatementHandler implements ICommandHandler<UpdateManyBankStatementsCommand> {

  constructor(
    private readonly publisher: EventPublisher,  
    private readonly model: BankStatementModel
  ) {}

  async execute(command: UpdateManyBankStatementsCommand) {
    const result = await this.model.updateMany(command.where, command.data);
    this.publisher.mergeObjectContext(this.model).commit();
    return result;
  }
}

export class DeleteBankStatementCommand implements ICommand {
  constructor(readonly id: number) {}
}

@CommandHandler(DeleteBankStatementCommand)
export class DeleteBankStatementHandler implements ICommandHandler<DeleteBankStatementCommand> {

  constructor(
    private readonly publisher: EventPublisher,  
    private readonly model: BankStatementModel
  ) {}

  async execute(command: DeleteBankStatementCommand) {
    const result = await this.model.deleteWithId(command.id);
    this.publisher.mergeObjectContext(this.model).commit();
    return result;
  }
}

export class DeleteManyBankStatementsCommand implements ICommand {
  constructor(readonly data: BankStatementWhere) {}
}

@CommandHandler(DeleteManyBankStatementsCommand)
export class DeleteManyBankStatementHandler implements ICommandHandler<DeleteManyBankStatementsCommand> {

  constructor(
    private readonly publisher: EventPublisher,  
    private readonly model: BankStatementModel
  ) {}

  async execute(command: DeleteManyBankStatementsCommand) {
    const result = await this.model.deleteWhere(command.data);
    this.publisher.mergeObjectContext(this.model).commit();
    return result;
  }
}

export class GetBankStatementCommand implements ICommand {
  constructor(readonly data: Prisma.BankStatementWhereUniqueInput) {}
}

@CommandHandler(GetBankStatementCommand)
export class GetBankStatementHandler implements ICommandHandler<GetBankStatementCommand> {

  constructor(
    private readonly publisher: EventPublisher,  
    private readonly model: BankStatementModel
  ) {}

  async execute(command: GetBankStatementCommand) {
    const result = await this.model.get(command.data);
    this.publisher.mergeObjectContext(this.model).commit();
    return result;
  }
}

export class ListBankStatementsCommand implements ICommand {
  constructor(readonly data: BankStatementListQuery) {}
}

@CommandHandler(ListBankStatementsCommand)
export class ListBankStatementsHandler implements ICommandHandler<ListBankStatementsCommand> {

  constructor(
    private readonly publisher: EventPublisher,  
    private readonly model: BankStatementModel
  ) {}

  async execute(command: ListBankStatementsCommand) {
    const result = await this.model.list(command.data);
    this.publisher.mergeObjectContext(this.model).commit();
    return result;
  }
}
