import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PaymentgatewayUtilsService } from 'src/utils/paymentgateway.utils.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { BookingEntity } from 'src/booking/entities/booking.entity';

@Injectable()
export class TransactionService {
  @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>
  @InjectRepository(BookingEntity) private readonly bookingRepo: Repository<BookingEntity>
  constructor(private readonly paymentgatewayUtilsService: PaymentgatewayUtilsService) { }

  private getAmount(currency: string): number {
    switch (currency) {
      case 'GBP':
      case 'USD':
      case 'EUR':
        return 5
      case 'NGN':
        return 5000
      default:
        throw new BadRequestException('Invalid currency')
    }
  }

  async makePayment(req: any, createTransactionDto: CreateTransactionDto) {
    try {
      const user = await this.userRepo.findOneBy({ email: req.user.email })
      const booking = await this.bookingRepo.findOneBy({ id: createTransactionDto.bookingId })

      if (!user)
        return new NotFoundException('User not found')

      if (!booking)
        return new NotFoundException('Booking not found')

      const amount = this.getAmount(createTransactionDto.currency)

      const response = await this.paymentgatewayUtilsService.client.transaction.initialize({
        email: user.email,
        amount: amount * 100,
        currency: createTransactionDto.currency,
        metadata: {
          bookingId: booking.id,
          userId: user.id,
          name: user.name,
        }

      })

      return response
    } catch (error) {
      return new InternalServerErrorException(error)
    }
  }

  async verifyPayment(reference: string) {
    try {

      if (!reference)
        throw new BadRequestException('Reference is required')

      const response = await this.paymentgatewayUtilsService.client.transaction.verify({ reference })
      const bookingId = response.data.metadata.bookingId
      const booking = await this.bookingRepo.findOne({ where: { id: bookingId } })
      const user = await this.userRepo.findOne({ where: { id: response.data.metadata.userId }, select: ['id', 'name', 'email'] })

      if (!booking)
        return new NotFoundException('Booking not found')

      if (!user)
        return new NotFoundException('User not found')

      // Send email reciept to user and admin

      if (response.data.status !== 'success')
        return new BadRequestException('Payment failed')

      booking.status = 'confirmed'
      await this.bookingRepo.save(booking)

      return response
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }


}
