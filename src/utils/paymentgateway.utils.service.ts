import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import PayStack from '@paystack/paystack-sdk'

@Injectable()
export class PaymentgatewayUtilsService {
    private readonly paystack: PayStack

    constructor(configService: ConfigService) {
        this.paystack = new PayStack(
            configService.get('PAYSTACK_TEST_SECRET_KEY'),
        )
    }

    get client() {
        return this.paystack
    }
}
