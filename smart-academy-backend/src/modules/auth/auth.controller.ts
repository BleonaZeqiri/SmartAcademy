import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import {
  CompleteProfileDto,
  CreateUserDto,
  LoginUserDto,
} from "./dto/auth.dto";
import { Tokens, UserPayload } from "./types/tokens.types";
import { GetCurrentUserIdDecorator } from "src/common/decorators/get-current-user-id.decorator";
import { Public } from "src/common/decorators/public.decorator";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post("signup")
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() dto: CreateUserDto): Promise<Tokens> {
    return this.authService.signup(dto);
  }

  @Public()
  @Post("signin")
  @HttpCode(HttpStatus.OK)
  signIn(@Body() dto: LoginUserDto): Promise<Tokens> {
    return this.authService.signIn(dto);
  }

  @Put("complete/profile")
  @UseInterceptors(FileInterceptor("profile_picture"))
  @HttpCode(HttpStatus.OK)
  async completeProfile(
    @GetCurrentUserIdDecorator() userId: number,
    @Body() dto: CompleteProfileDto,
    @UploadedFile() file: Express.Multer.File
  ): Promise<CompleteProfileDto> {
    if (file?.filename) {
      dto.profile_picture = file.filename;
    }

    return this.authService.completeProfile(userId, dto);
  }

  @Get("profile")
  @HttpCode(HttpStatus.OK)
  getProfile(
    @GetCurrentUserIdDecorator() userId: number
  ): Promise<UserPayload> {
    return this.authService.getProfileById(userId);
  }

  @Public()
  @Get("profile/:id")
  @HttpCode(HttpStatus.OK)
  getProfileById(@Param("id") id: string): Promise<UserPayload> {
    return this.authService.getProfileById(+id);
  }
}
