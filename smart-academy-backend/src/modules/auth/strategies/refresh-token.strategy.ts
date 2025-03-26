import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload, JwtPayloadRefresh } from '../types/tokens.types';
@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('REFRESH_TOKEN_KEY'),
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: JwtPayload): JwtPayloadRefresh {
    const refreshToken = req
      ?.get('authorization')
      ?.replace('Bearer', '')
      ?.trim();

    if (!refreshToken) {
      throw new ForbiddenException('Refresh Token is invalid!');
    }

    return {
      refreshToken,
      ...payload,
    };
  }
}
