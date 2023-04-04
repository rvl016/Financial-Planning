import { NotImplementedException } from "@nestjs/common";
import { AggregateRoot, EventsHandler } from "@nestjs/cqrs";

export class AppendBankStatementEvent {
  constructor() {}
}

@EventsHandler(AppendBankStatementEvent)
export class BankStatementEventHandler extends AggregateRoot {

  async execute(command: AppendBankStatementEvent): Promise<any> {
    throw new NotImplementedException();
  }

}