import {HttpException, Injectable, InternalServerErrorException, Logger} from "@nestjs/common";
import * as SendGrid from '@sendgrid/mail';
import * as process from "node:process";
import * as dotenv from "dotenv";
import {MailDataRequired} from "@sendgrid/mail";
dotenv.config();

@Injectable()
export class SendgridClientService {

    private readonly logger = new Logger(SendgridClientService.name);

    constructor() {
        this.initializedSendGrid();
    }

    async sendEmail(mail: MailDataRequired): Promise<void> {
        try {
            await SendGrid.send(mail);
        } catch (error) {
            this.logger.error('Error while sending email', error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException(error.message);
        }
    }

    private initializedSendGrid() {
        const apiKey = process.env.EMAIL_API_KEY;
        if (!apiKey) {
            this.logger.log("No API key provided");
            throw new Error("Not API key provided");
        }
        SendGrid.setApiKey(apiKey);
    }

}
