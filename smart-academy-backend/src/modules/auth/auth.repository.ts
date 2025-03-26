import { ForbiddenException, Inject, Injectable } from "@nestjs/common";
import {
  CompleteProfileDto,
  CreateUserDto,
  LoginUserDto,
} from "./dto/auth.dto";
import {
  JwtPayload,
  Tokens,
  UserEmail,
  UserPayload,
} from "./types/tokens.types";
import * as argon from "argon2";
import { PrismaService } from "../prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
@Injectable()
export class AuthRepository {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    @Inject(ConfigService)
    private configService: ConfigService
  ) {}

  async createUser(data: CreateUserDto): Promise<Tokens> {
    const hashedPassword = await argon.hash(data.password);
    const user = await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async getTokens(userId: number, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email: email,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get<string>("ACCESS_TOKEN_KEY"),
        expiresIn: this.configService.get<string>("ACCESS_TOKEN_EXPIRE_TIME"),
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get<string>("REFRESH_TOKEN_KEY"),
        expiresIn: this.configService.get<string>("REFRESH_TOKEN_EXPIRE_TIME"),
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
  async updateRtHash(userId: number, refreshToken: string): Promise<void> {
    const hash = await argon.hash(refreshToken);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refresh_token: hash,
      },
    });
  }
  async findUserByEmail(email: string): Promise<UserEmail> {
    return this.prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        email: true,
      },
    });
  }
  async userSignIn(data: LoginUserDto): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      throw new ForbiddenException("Access denied no such user!");
    }

    const passwordMatches = await argon.verify(user.password, data.password);
    if (!passwordMatches) {
      throw new ForbiddenException("Incorrect Password!");
    }

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }
  getProfileById(userId: number): Promise<UserPayload> {
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        username: true,
        profile_picture: true,
        about: true,
        phone_number: true,
        refresh_token: true,
        location: true,
        created_at: true,
        updated_at: true,
        _count: true,
      },
    });
  }
  completeProfile(
    user_id: number,
    dto: CompleteProfileDto
  ): Promise<CompleteProfileDto> {
    return this.prisma.user.update({
      where: {
        id: user_id,
      },
      data: {
        location: dto.location,
        phone_number: dto.phone_number,
        about: dto.about,
        profile_picture: dto.profile_picture,
      },
      select: {
        id: true,
        email: true,
        username: true,
        phone_number: true,
        location: true,
        about: true,
        profile_picture: true,
      },
    });
  }
}
