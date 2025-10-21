import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordUtilsService {
    hashPassword(password: string) {
        return bcrypt.hash(password, 10);
    }

    comparePassword(password, hashedPassword) {
        return bcrypt.compare(password, hashedPassword);
    }
}
