import { IEvent } from "@nestjs/cqrs";
import { Prisma } from "@prisma/client";
import { IsNotEmptyObject, ValidateNested } from "class-validator";

export class CreateEntityAccountDto {

  constructor(name: string) {
    this.name = name;
  }

  @IsNotEmptyObject()
  readonly name: string
}

export class CreateBankStatementDto {

  constructor(entityAccount: CreateEntityAccountDto) {
    this.entityAccount = entityAccount;
  }

  @ValidateNested()
  readonly entityAccount: CreateEntityAccountDto
}

export type BankStatementWhere = Prisma.BankStatementWhereInput;
export type BankStatementWhereOne = Prisma.BankStatementWhereUniqueInput;
export type BankStatementUpdateDto = Prisma.BankStatementUpdateInput;
export type BankStatementCreateDto = Prisma.BankStatementCreateInput;
export type BankStatementOrderBy = Prisma.BankStatementOrderByWithRelationInput;

interface _BankStatementListQuery {
  skip: number,
  take: number,
  cursor: BankStatementWhereOne,
  where: BankStatementWhere,
  orderBy: BankStatementOrderBy
}

export type BankStatementListQuery = Partial<_BankStatementListQuery>;

export interface BankStatementDefaultRead extends IEvent {
  id: number,
  entityAccount?: {
    id: number,
    name: string,
  },
  _count: {
    items: number,
  },
}