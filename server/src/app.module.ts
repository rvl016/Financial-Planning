import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BankStatementModule } from './bank-statement/bank-statement.module';
import { CqrsModule } from '@nestjs/cqrs';
import { DbModule as DbModule } from './db-service/db-service.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.env', 'env.production.env'],
      load: []
    }),
    CqrsModule,
    forwardRef(() => BankStatementModule),
    DbModule
  ],
  exports: [CqrsModule],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}
