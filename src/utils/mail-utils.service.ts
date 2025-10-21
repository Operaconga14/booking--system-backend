import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailUtilsService {
    constructor(private mailerService: MailerService) { }

    async sendRegistrationMail(to: string, name: string) {
        try {
            await this.mailerService.sendMail({
                to,
                subject: 'Successful Registration',
                template: './registration.html',
                context: {
                    name,
                    fullYear: new Date().getFullYear(),
                }
            });

            return { message: 'User registered successfully check your email' };
        } catch (error) {
            return new Error(error);
        }
    }

    async sendRoleInvite(to: string, name: string, role: string) {
        try {
            await this.mailerService.sendMail({
                to,
                subject: 'Role Invite',
                template: './role-invite.html',
                context: {
                    name,
                    role,
                    fullYear: new Date().getFullYear(),
                }
            });

            return { message: 'User invited successfully' };
        } catch (error) {
            return new Error(error);
        }
    }

    async sendAccountDeletionMail(to: string, name: string) {
        try {
            await this.mailerService.sendMail({
                to,
                subject: 'Account Deleted',
                template: './account-deletion.html',
                context: {
                    name,
                    fullYear: new Date().getFullYear(),
                }
            });

            return { message: 'User deleted successfully, a mail has been sent to you' };
        } catch (error) {
            return new Error(error);
        }
    }

    async sendAdminSelfRegistrationSuccessMail(to: string, name: string, role: string) {
        try {
            await this.mailerService.sendMail({
                to,
                subject: 'Successful Registration',
                template: './admin-registration.html',
                context: {
                    name,
                    role,
                    fullYear: new Date().getFullYear(),
                }
            });

            return { message: 'Admin registered successfully check your email' };
        } catch (error) {
            return new Error(error);
        }
    }


}
