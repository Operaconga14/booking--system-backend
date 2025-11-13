import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'

@Injectable()
export class PasswordUtilsService {
    /**
     * @param password - Plain text password from user
     * @returns - Promise<string> - Hashed password
     */
    hashPassword(password: string) {
        return bcrypt.hash(password, 10);
    }

    /**
     * @param password - Plain text password from user
     * @param hashedPassword - Hashed password from database
     * @returns - Promise<boolean> - True if password matches, false otherwise
     */
    comparePassword(password: string, hashedPassword: string) {
        return bcrypt.compare(password, hashedPassword);
    }

}
