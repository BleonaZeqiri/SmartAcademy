import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthRepository } from "./auth.repository";
import { JwtModule } from "@nestjs/jwt";
import { AccessTokenStrategy } from "./strategies/access-token.strategy";
import { RefreshTokenStrategy } from "./strategies/refresh-token.strategy";
import { MulterModule } from "@nestjs/platform-express";
import { MulterMiddleware } from "src/common/middleware/multer.middleware";
import { mimeTypes } from "src/utility/constants";
@Module({
  imports: [
    JwtModule.register({}),
    MulterModule.register(MulterMiddleware(70000000000000, mimeTypes)),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRepository,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
  exports: [AuthRepository],
})
export class AuthModule {}
