import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Flutterwave from 'flutterwave-node-v3';

/**
 * Utility service for Flutterwave payment gateway integration
 * Provides access to the Flutterwave client for processing payments
 */
@Injectable()
export class FlutterwaveUtilsService {
    private readonly flutterWave: Flutterwave;

    constructor(configService: ConfigService) {
        // Initialize Flutterwave client with API credentials from environment
        this.flutterWave = new Flutterwave(
            configService.get('FLUTTERWAVE_PUBLIC_KEY'),
            configService.get('FLUTTERWAVE_SECRET_KEY')
        );
    }

    /**
     * Returns the configured Flutterwave client instance
     * @returns Flutterwave client for payment operations
     */
    get client() {
        return this.flutterWave;
    }
}
