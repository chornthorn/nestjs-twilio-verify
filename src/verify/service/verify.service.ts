import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectTwilio, TwilioClient } from 'nestjs-twilio';
import { CheckVerificationTokenDTO } from '../models/dto/CheckVerificationToken.dto';
import { SendVerificationTokenDTO } from '../models/dto/SendVerificationToken.dto';
import { Verify } from '../models/verify.model';

@Injectable()
export class VerifyService {
    constructor(@InjectTwilio() private readonly client: TwilioClient) { }

    async sendVerificationToken(request: SendVerificationTokenDTO) : Promise<Verify> {
        try {
            const res =  await this.client.verify.services(process.env.VERIFICATION_SID)
             .verifications
                .create({ to: request.phoneNumber, channel: 'sms' });
            const v = new Verify();
            v.id = res.sid;
            v.phoneNumber = res.to;
            v.status = res.status;
            v.expiredIn = res.sendCodeAttempts[0]['time'];
            return v;
        } catch (error) {
            throw new HttpException('Send Verification failure!',HttpStatus.BAD_REQUEST);
        }
    }

    async CheckVerificationToken(request: CheckVerificationTokenDTO) : Promise<Verify> {
        try {
            const res =  await this.client.verify.services(process.env.VERIFICATION_SID)
             .verificationChecks
                .create({ to: request.phoneNumber, code: request.verifyCode });
            const v = new Verify();
            v.id = res.sid;
            v.phoneNumber = res.to;
            v.status = res.status;
            v.expiredIn = null;
            return v;
        } catch (error) {
            throw new HttpException('Check Verification failure!',HttpStatus.BAD_REQUEST);
        }
    }
}
