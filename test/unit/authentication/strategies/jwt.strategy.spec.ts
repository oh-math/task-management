import { JwtStrategy } from '@authentication/strategies';
import { PayloadJWT } from '@common/interfaces';
import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { email as fakerEmail, user_id as fakerId } from 'test/helper/user';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [JwtStrategy],
      imports: [
        ConfigModule.forRoot({
          envFilePath: ['.env.test'],
        }),
      ],
    }).compile();

    jwtStrategy = moduleRef.get<JwtStrategy>(JwtStrategy);
  });

  describe('validate', () => {
    let sub = fakerId;
    let email = fakerEmail;
    let payloadJwt: PayloadJWT = {
      sub,
      email,
    };

    it('should return `PayloadJWT` object', async () => {
      const validatedUserPayload = await jwtStrategy.validate(payloadJwt);

      expect(validatedUserPayload).toMatchObject<PayloadJWT>(payloadJwt);
    });
  });
});
