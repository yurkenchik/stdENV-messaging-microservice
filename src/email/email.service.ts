import {HttpException, Injectable, InternalServerErrorException} from '@nestjs/common';
import { MailDataRequired } from "@sendgrid/mail";
import {SendgridClientService} from "./sendgrid-client.service";
import * as process from "node:process";
import * as dotenv from "dotenv";
dotenv.config();

@Injectable()
export class EmailService {

    constructor(
        private readonly sendgridClientService: SendgridClientService,
    ) {}

    async sendEmail(recipient: string, verificationCode: string): Promise<void> {
        try {
            const mail: MailDataRequired = {
                to: recipient,
                from: process.env.EMAIL_SENDER,
                subject: "Code verification",
                text: `Your verification code: ${verificationCode}`
            };
            console.log("MAIL: ", mail);
            await this.sendgridClientService.sendEmail(mail);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException(error.message);
        }
    }

    async sendEmailWithTemplate(recipient: string, body: string): Promise<void> {
        const mail: MailDataRequired = {
            to: recipient,
            cc: 'example@mail.com',
            from: 'noreply@domain.com',
            templateId: process.env.SENDGRIP_MAIL_TEMPLATE_ID,
            dynamicTemplateData: { body, subject: 'Send Email with template' },
        };
        await this.sendgridClientService.sendEmail(mail);
    }

}
