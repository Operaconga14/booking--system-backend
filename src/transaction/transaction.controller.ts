import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { RoleGuard } from 'src/guards/role.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/role.decorator';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) { }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('user')
  @Post('make-payment')
  pay(@Req() req: any, @Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.makePayment(req, createTransactionDto)
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('user')
  @Get('verify-payment')
  verify(@Query('reference') reference: string) {
    return this.transactionService.verifyPayment(reference)
  }
}
