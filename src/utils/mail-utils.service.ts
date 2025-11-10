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
     * --------------------------------------------------------------
     *                      USER EMAILS MANAGMENT
     * --------------------------------------------------------------
     */

    /**
     * Sends a registration confirmation email to a new user
     * @param to - User email address
     * @param name - User name
     */
    async sendRegistrationMail(to: string, name: string) {
        this.mailerService.sendMail({
            to,
            subject: 'Registration Confirmation',
            template: './registration.html',
            context: {
                name,
                fullYear: new Date().getFullYear()
            },
        })
    }


    /**
     * -------------------------------------------------------------
     *                      ADMIN EMAILS MANAGMENT
     * -------------------------------------------------------------
     */

    /**
     * 
     * @param to -Admin Email
     * @param name -Admin Name
     */
    async sendInviteMail(to: string, name: string) { }


    /**
     * --------------------------------------------------------------
     *                      BOOKING EMAILS MANAGMENT
     * --------------------------------------------------------------
     */

    /**
     * 
     * @param to - User and Admins
     * @param name - User and Admins
     */
    async sendBookingMail(to: string[], name: string[]) { }

    /**
     * --------------------------------------------------------------
     *                      TRANSACTION EMAILS MANAGMENT
     * --------------------------------------------------------------
     */

    /**
     * 
     * @param to - User and Admins
     * @param name - User and Admins
     */
    async sendTransactionMail(to: string[], name: string[]) { }

    /**
     * ---------------------------------------------------------------
     *              AVAILABILITY EMAILS MANAGMENT
     * ---------------------------------------------------------------
     */

    /**
     * 
     * @param to - User and Admins
     * @param name - User and Admins
     */
    async sendAvailabilityMail(to: string[], name: string[]) { }

}
