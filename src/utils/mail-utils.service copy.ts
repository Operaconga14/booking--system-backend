import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

/**
 * Utility service for sending various types of emails
 * Uses MailerService with Handlebars templates for formatted emails
 */
@Injectable()
export class MailUtilsService {
    constructor(private mailerService: MailerService) { }

    /**
     * Sends a registration confirmation email to a new user
     * @param to - Recipient email address
     * @param name - User's name for personalization
     * @returns Success message or Error
     */
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

    /**
     * Sends a role invitation email to a user
     * @param to - Recipient email address
     * @param name - User's name
     * @param role - Role being assigned (e.g., 'admin')
     * @returns Success message or Error
     */
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

    /**
     * Sends an account deletion confirmation email
     * @param to - Recipient email address
     * @param name - User's name
     * @returns Success message or Error
     */
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

    /**
     * Sends a registration confirmation email to a new admin
     * @param to - Recipient email address
     * @param name - Admin's name
     * @param role - Admin role type
     * @returns Success message or Error
     */
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

    /**
     * Sends a profile update confirmation email
     * @param to - Recipient email address
     * @param name - User's name
     * @returns Success message or Error
     */
    async sendProfileUpdateSuccessMail(to: string, name: string) {
        try {
            await this.mailerService.sendMail({
                to,
                subject: 'Successful Profile Update',
                template: './profile-update.html',
                context: {
                    name,
                    fullYear: new Date().getFullYear()
                }
            })

            return { message: 'Your profile has been updated succefully check your mail' }
        } catch (error) {
            return new Error(error)
        }
    }


}
