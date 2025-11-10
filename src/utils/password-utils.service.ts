import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

/**
 * Utility service for password hashing and verification
 * Uses bcrypt for secure password storage and comparison
 */
@Injectable()
export class PasswordUtilsService {
    /**
     * Hashes a plain text password using bcrypt
     * @param password - Plain text password to hash
     * @returns Promise resolving to hashed password string
     */
    hashPassword(password: string) {
        // Hash password with salt rounds of 10
        return bcrypt.hash(password, 10);
    }

    /**
     * Compares a plain text password with a hashed password
     * @param password - Plain text password to verify
     * @param hashedPassword - Hashed password to compare against
     * @returns Promise resolving to boolean indicating if passwords match
     */
    comparePassword(password, hashedPassword) {
        return bcrypt.compare(password, hashedPassword);
    }
}
