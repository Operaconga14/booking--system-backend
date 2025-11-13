import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from 'src/user/entities/user.entity';
import { verify, sign } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenUtilsService {
    private readonly JWT_SECRET: string;

    constructor(configService: ConfigService) {
        // Load JWT secret from environment variables
        this.JWT_SECRET = configService.get<string>('JWT_SECRET')!;

        if (!this.JWT_SECRET)
            throw new InternalServerErrorException('JWT_SECRET is not defined');
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

        const token = sign(payload, this.JWT_SECRET, { expiresIn: '1d' });
        return token;
    }

    /**
     * @param token - generate for each user
     * @returns success or error message
     */
    verifyToken(token: string) {
        try {
            const decode = verify(token, this.JWT_SECRET);
            return decode;
        } catch (error) {
            throw new UnauthorizedException(error);
        }
    }
}
