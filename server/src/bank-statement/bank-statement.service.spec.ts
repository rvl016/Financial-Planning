import { Test, TestingModule } from '@nestjs/testing';
import { BankStatementService } from './bank-statement.service';
import { CreateBankStatementDto, CreateEntityAccountDto } from './bank-statement.dto';
import { BankStatementModule, bankStatementRepositoryProvider } from './bank-statement.module';
import { AppModule } from '../app.module';
import { CqrsModule } from '@nestjs/cqrs';

describe('BankStatementService', () => {
  let service: BankStatementService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        AppModule, BankStatementModule
      ],
    }).compile();
    await module.init();

    service = await module.resolve<BankStatementService>(BankStatementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get all records', () => {
    return expect(service.list({})).resolves.toBe([]);
  });

  it('should create record', () => {
    const name = "Test Account 1";
    const dto = new CreateBankStatementDto(new CreateEntityAccountDto(name));
    return expect(service.create(dto)).resolves.toMatchObject({ entityAccount: { name } });
  });
});
