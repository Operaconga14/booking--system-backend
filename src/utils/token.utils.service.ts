import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/user/entities/user.entity';
import { verify, sign } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenUtilsService {
    private readonly JWT_SECRET: string;

    constructor(configService: ConfigService) {
        // Load JWT secret from environment variables
        this.JWT_SECRET = configService.get<string>('JWT_SECRET')!;
    }

    /**
     * @param user - get the user email, id for encryption with the token
     * @returns token
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
     * @param token - generate for each user
     * @returns success or error message
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
