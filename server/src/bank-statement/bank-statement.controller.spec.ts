import { Test, TestingModule } from '@nestjs/testing';
import { BankStatementController } from './bank-statement.controller';
import { BankStatementModel } from './bank-statement.model';
import { BankStatementModule, bankStatementRepositoryProvider } from './bank-statement.module';
import { BankStatementService } from './bank-statement.service';
import { AppModule } from '../app.module';

describe('BankStatementController', () => {
  let controller: BankStatementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule, BankStatementModule,
      ],
    }).compile();

    controller = module.get<BankStatementController>(BankStatementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
