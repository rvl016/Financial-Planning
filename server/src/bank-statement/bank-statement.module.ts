import { InjectionToken, Module, Provider, Type } from '@nestjs/common';
import { BankStatementModel } from './bank-statement.model';
import { BankStatementController } from './bank-statement.controller';
import { BankStatementDefaultRepository, IBankStatementRepository } from './bank-statement.repository';
import { BankStatementService } from './bank-statement.service';
import PrismaService from '../db-service/prisma.service';
import { AppModule } from '../app.module';
import { BankStatementEventHandler } from './bank-statement.events';
import { AddBankStatementHandler, DeleteBankStatementHandler, DeleteManyBankStatementHandler, GetBankStatementHandler, ListBankStatementsHandler, UpdateBankStatementHandler, UpdateManyBankStatementHandler } from './bank-statement.command';
import { DbModule } from '../db-service/db-service.module';
import { isDevelopment } from '../main';
import { CqrsModule } from '@nestjs/cqrs';

export enum Injectables {
  IBankStatementRepository = "IBankStatementRepository",
}

const commandHandlers = [
  ListBankStatementsHandler, 
  GetBankStatementHandler, 
  AddBankStatementHandler, 
  UpdateBankStatementHandler, 
  UpdateManyBankStatementHandler, 
  DeleteBankStatementHandler, 
  DeleteManyBankStatementHandler
];
const eventHandlers = [BankStatementEventHandler];

function getProviderWithMockImpl(key: InjectionToken, defaultImpl: Type, mockImpl: Type ): Provider {
  return {
    provide: key,
    useClass: isDevelopment ? defaultImpl : mockImpl
  }
}

export const bankStatementRepositoryProvider = getProviderWithMockImpl(
  "IBankStatementRepository", 
  BankStatementDefaultRepository, 
  BankStatementDefaultRepository,
);


@Module({
  controllers: [BankStatementController],
  imports: [
    DbModule,
    CqrsModule
  ],
  providers: [
    bankStatementRepositoryProvider,
    BankStatementModel,
    BankStatementService,
    ...commandHandlers,
    ...eventHandlers,
  ],
})
export class BankStatementModule {}
