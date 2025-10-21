import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/entities/user.entity';
import { sign, verify } from 'jsonwebtoken';


@Injectable()
export class TokenUtilsService {
    private readonly JWT_SECRET: string;

    constructor(configService: ConfigService) {
        this.JWT_SECRET = configService.get<string>('JWT_SECRET')!;
    }

    generateToken(user: User) {
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role
        };

        if (!this.JWT_SECRET)
            throw new Error('JWT_SECRET is not defined');

        const token = sign(payload, this.JWT_SECRET, { expiresIn: '1d' });
        return token;
    }

    verifyToken(token: string) {

        try {
            if (!this.JWT_SECRET)
                throw new Error('JWT_SECRET is not defined');

            const decode = verify(token, this.JWT_SECRET);
            return decode;
        } catch (error) {
            throw new Error('Token verification failed: ' + error.message);
        }
    }
}
