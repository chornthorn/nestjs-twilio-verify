import { Body, Controller, Post } from '@nestjs/common';
import { CheckEmailVerificationTokenDTO } from '../models/dto/CheckEmailVerificationToken.dto';
import { CheckVerificationTokenDTO } from '../models/dto/CheckVerificationToken.dto';
import { SendEmailVerificationTokenDTO } from '../models/dto/SendEmailVerificationToken.dto';
import { SendVerificationTokenDTO } from '../models/dto/SendVerificationToken.dto';
import { EmailVerifyModel } from '../models/email.model';
import { Verify } from '../models/verify.model';
import { VerifyService } from '../service/verify.service';

@Controller('verify')
export class VerifyController {
    constructor(private readonly verifyService: VerifyService) { }

    @Post("mobile/send")
    async sendPhoneVerificationToken(@Body() request: SendVerificationTokenDTO): Promise<Verify> {
        return this.verifyService.sendPhoneVerificationToken(request);
    }

    @Post("mobile/check")
    async checkMobileVerificationToken(@Body() request: CheckVerificationTokenDTO): Promise<Verify> {
        return this.verifyService.CheckPhoneVerificationToken(request);
    }

    @Post("email/send")
    async sendEmailVerificationToken(@Body() request: SendEmailVerificationTokenDTO): Promise<EmailVerifyModel> {
        return this.verifyService.sendEmailVerificationToken(request);
    }

    @Post("email/check")
    async checkEmailMobileVerificationToken(@Body() request: CheckEmailVerificationTokenDTO): Promise<EmailVerifyModel> {
        return this.verifyService.CheckEmailVerificationToken(request);
    }
}
