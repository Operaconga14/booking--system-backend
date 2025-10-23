import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Flutterwave from 'flutterwave-node-v3';

@Injectable()
export class FlutterwaveUtilsService {
    private readonly flutterWave: Flutterwave;

    constructor(configService: ConfigService) {
        this.flutterWave = new Flutterwave(
            configService.get('FLUTTERWAVE_PUBLIC_KEY'),
            configService.get('FLUTTERWAVE_SECRET_KEY')
        );
    }

    get client() {
        return this.flutterWave;
    }
}
