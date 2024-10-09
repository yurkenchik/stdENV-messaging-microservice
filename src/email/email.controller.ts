import {Controller, HttpException, InternalServerErrorException, Logger} from '@nestjs/common';
import {MessagePattern, Payload} from "@nestjs/microservices";
import {EmailService} from "./email.service";
import {SendVerificationCodeInput} from "@studENV/shared/dist/inputs/email/send-verification-code.input";
import {MessageOutput} from "@studENV/shared/dist/outputs/messages/message.output";

@Controller('email')
export class EmailController {

    private readonly logger = new Logger(EmailController.name);

    constructor(
        private readonly emailService: EmailService,
    ) {}

    @MessagePattern({ cmd: "sendVerificationCodeEmail" })
    async sendVerificationCodeEmail(
        @Payload() sendVerificationCodeInput: SendVerificationCodeInput
    ): Promise<MessageOutput> {
        try {
            const { recipient, verificationCode } = sendVerificationCodeInput;
            await this.emailService.sendEmail(recipient, verificationCode);
            return { message: "Verification code was sent" };
        } catch (error) {
            this.logger.log(JSON.stringify({message: `Error: ${error.message}`}));
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException(error.message);
        }
    }

}
