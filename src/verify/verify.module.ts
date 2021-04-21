import { Module } from '@nestjs/common';
import { VerifyController } from './controller/verify.controller';
import { VerifyService } from './service/verify.service';

@Module({
  controllers: [VerifyController],
  providers: [VerifyService]
})
export class VerifyModule {}
