import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TwilioModule } from 'nestjs-twilio';
import { VerifyModule } from './verify/verify.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TwilioModule.forRoot({
      accountSid: process.env.TWILIO_ACCOUNT_SID,
      authToken: process.env.TWILIO_AUTH_TOKEN,
    }),
    VerifyModule,
  ],
})
export class AppModule {}
