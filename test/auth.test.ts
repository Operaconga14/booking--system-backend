import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../src/auth/auth.service';
import { PasswordUtilsService } from 'src/utils/password-utils.service';
import { TokenUtilsService } from 'src/utils/token-utils.service';

describe('AuthService', () => {
    let service: AuthService;

    // Create mocks for dependencies
    const mockPasswordUtilsService = {
        hashPassword: jest.fn().mockResolvedValue('hashed-password'),
        comparePassword: jest.fn().mockResolvedValue(true),
    };

    const mockTokenUtilsService = {
        generateToken: jest.fn().mockReturnValue('fake-jwt-token'),
        verifyToken: jest.fn().mockReturnValue({ id: 1 }),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                { provide: PasswordUtilsService, useValue: mockPasswordUtilsService },
                { provide: TokenUtilsService, useValue: mockTokenUtilsService },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create a user (mock example)', async () => {
        const dto = {
            name: 'John Doe',
            email: 'john@example.com',
            password: '123456',
        };

        // Mock any internal function your service might call
        const result = await service.userRegistration(dto); // or whatever your method is called

        // Example expectation
        expect(mockPasswordUtilsService.hashPassword).toHaveBeenCalledWith('123456');
        expect(mockTokenUtilsService.generateToken).toHaveBeenCalled();
        expect(result).toBeDefined();
    });
});
