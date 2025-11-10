import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
    let service: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthService],
        }).compile();

        service = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create a user', () => {
        const result = service.userRegistration({
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password',
        });
        expect(result).toEqual({
            id: expect.any(Number),
            name: 'John Doe',
            email: 'john@example.com',
        });
    });
});
