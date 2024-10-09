import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailModule } from './email/email.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([]),
        EmailModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
