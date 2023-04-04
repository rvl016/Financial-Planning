import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { BankStatementCreateDto, BankStatementDefaultRead, BankStatementListQuery, BankStatementUpdateDto, BankStatementWhere, BankStatementWhereOne } from "./bank-statement.dto";
import PrismaService from "../db-service/prisma.service";

export interface IBankStatementRepository {
  get: (where: BankStatementWhereOne) => Promise<BankStatementDefaultRead>,
  getMany: (query: BankStatementListQuery) => Promise<Array<BankStatementDefaultRead>>,
  create: (data: BankStatementCreateDto) => Promise<BankStatementDefaultRead>,
  update: (
    where: BankStatementWhereOne, data: BankStatementUpdateDto
  ) => Promise<BankStatementDefaultRead>,
  updateMany: (
    where: BankStatementWhere, data: BankStatementUpdateDto
  ) => Promise<BankStatementDefaultRead[]>,
  delete: (where: BankStatementWhereOne) => Promise<BankStatementDefaultRead>;
  deleteMany: (where: BankStatementWhere) => Promise<BankStatementDefaultRead[]>;
}

@Injectable()
export class BankStatementDefaultRepository implements IBankStatementRepository {

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  private readonly query = {
    select: Prisma.validator<Prisma.BankStatementSelect>()({
      id: true,
      entityAccount: {
        select: {
          id: true,
          name: true,
        },
      },
      _count: {
        select: {
          items: true
        }
      }
    })
  };

  async get(where: Prisma.BankStatementWhereUniqueInput) {
    return this.prisma.bankStatement.findUnique({
      ...this.query,
      where,
    }) as Promise<BankStatementDefaultRead>;
  }

  async getMany(query: BankStatementListQuery) {
    return this.prisma.bankStatement.findMany({
      ...this.query,
      where: query.where,
      orderBy: query.orderBy,
      skip: query.skip,
      take: query.take,
      cursor: query.cursor,
    }) as Promise<Array<BankStatementDefaultRead>>;
  }

  async create(data: Prisma.BankStatementCreateInput) {
    return this.prisma.bankStatement.create({
      data, 
      ...this.query,
    }) as Promise<BankStatementDefaultRead>;
  }

  async update(where: Prisma.BankStatementWhereUniqueInput, data: Prisma.BankStatementUpdateInput) {
    return this.prisma.bankStatement.update(
      { where, data, ...this.query }
    ) as Promise<BankStatementDefaultRead>;
  }

  async updateMany(where: Prisma.BankStatementWhereInput, data: Prisma.BankStatementUpdateInput) {
    const toDelete = await this.getMany({where});
    await this.prisma.bankStatement.updateMany({ 
      where: { id: { in: toDelete.map(v => v.id) }}, 
      data
    });
    return toDelete;
  }

  async delete(where: Prisma.BankStatementWhereUniqueInput) {
    const toDelete = await this.get(where);
    await this.prisma.bankStatement.delete({ where });
    return toDelete;
  }

  async deleteMany(where: Prisma.BankStatementWhereInput) {
    const toDelete = await this.getMany({where});
    await this.prisma.bankStatement.deleteMany({ 
      where: { id: { in: toDelete.map(v => v.id) } }
    });
    return toDelete;
  }
}
