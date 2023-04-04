import { Get, Post, Body, Patch, Param, Delete, Header, Redirect, Query, Controller, HostParam, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { BankStatementListQuery, CreateBankStatementDto, BankStatementUpdateDto, BankStatementWhere, BankStatementWhereOne } from './bank-statement.dto';
import { BankStatementService } from './bank-statement.service';

@Controller('bank-statements')
export class BankStatementController {
  constructor(private readonly bankStatementService: BankStatementService) {}

  @Get()
  findMany(@Body('data') data: BankStatementListQuery) {
    return this.bankStatementService.list(data);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.bankStatementService.get({id: +id});
  }

  @Post()
  create(@Body() data: CreateBankStatementDto) {
    return this.bankStatementService.create(data);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() data: BankStatementUpdateDto) {
    return this.bankStatementService.update({id: +id}, data);
  }

  @Patch()
  updateMany(@Body('where') where: BankStatementWhere, @Body('data') data: BankStatementUpdateDto) {
    return this.bankStatementService.updateMany(where, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.bankStatementService.delete(+id);
  }

  @Delete()
  deleteMany(@Body() where: BankStatementWhere) {
    return this.bankStatementService.deleteMany(where);
  }


}
