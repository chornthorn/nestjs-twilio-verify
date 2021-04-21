import { Body, Controller, Post } from '@nestjs/common';
import { CheckVerificationTokenDTO } from '../models/dto/CheckVerificationToken.dto';
import { SendVerificationTokenDTO } from '../models/dto/SendVerificationToken.dto';
import { Verify } from '../models/verify.model';
import { VerifyService } from '../service/verify.service';

@Controller('verify')
export class VerifyController {
    constructor(private readonly verifyService: VerifyService) { }

    @Post("send")
    async sendVerificationToken(@Body() request: SendVerificationTokenDTO): Promise<Verify> {
        return this.verifyService.sendVerificationToken(request);
    }
    @Post("check")
    async checkVerificationToken(@Body() request: CheckVerificationTokenDTO): Promise<Verify> {
        return this.verifyService.CheckVerificationToken(request);
    }
}
