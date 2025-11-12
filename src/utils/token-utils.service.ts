import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sign, verify } from 'jsonwebtoken';
import { UserEntity } from 'src/user/entities/user.entity';

/**
 * Utility service for JWT token operations
 * Handles token generation and verification for authentication
 */
@Injectable()
export class TokenUtilsService {
    private readonly JWT_SECRET: string;

    constructor(configService: ConfigService) {
        // Load JWT secret from environment variables
        this.JWT_SECRET = configService.get<string>('JWT_SECRET')!;
    }

    /**
     * Generates a JWT token for the authenticated user
     * @param user - User entity containing user information
     * @returns Signed JWT token string valid for 1 day
     * @throws Error if JWT_SECRET is not configured
     */
    generateToken(user: UserEntity) {
        // Create token payload with user information
        const payload = {
            id: Number(user.id),
            email: user.email,
            role: user.role
        };

        if (!this.JWT_SECRET)
            throw new Error('JWT_SECRET is not defined');

        // Sign and return token with 1 day expiration
        const token = sign(payload, this.JWT_SECRET, { expiresIn: '1d' });
        return token;
    }

    /**
     * Verifies and decodes a JWT token
     * @param token - JWT token string to verify
     * @returns Decoded token payload containing user information
     * @throws Error if token is invalid, expired, or JWT_SECRET is not configured
     */
    verifyToken(token: string) {
        try {
            if (!this.JWT_SECRET)
                throw new Error('JWT_SECRET is not defined');

            // Verify signature and decode token
            const decode = verify(token, this.JWT_SECRET);
            return decode;
        } catch (error) {
            throw new Error('Token verification failed: ' + error.message);
        }
    }
}
