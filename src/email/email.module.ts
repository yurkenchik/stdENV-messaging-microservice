import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {NatsClientModule} from "@studENV/shared/dist/nats-client/nats-client.module";
import {SendgridClientService} from "./sendgrid-client.service";
import {JwtModule} from "@nestjs/jwt";

@Module({
  providers: [EmailService, SendgridClientService],
  controllers: [EmailController],
  imports: [
      NatsClientModule,
      JwtModule
  ],
  exports: [EmailService],
})
export class EmailModule {}
