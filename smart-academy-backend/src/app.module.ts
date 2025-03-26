import { Module } from "@nestjs/common";
import { AuthModule } from "./modules/auth/auth.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import jwtTokensConfig from "config/jwtTokens.config";
import { PrismaModule } from "./modules/prisma/prisma.module";
import { APP_GUARD } from "@nestjs/core";
import { AccessTokenGuard } from "./common/guards/access-token.guard";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [jwtTokensConfig] }),
    AuthModule,
    PrismaModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
})
export class AppModule {}
