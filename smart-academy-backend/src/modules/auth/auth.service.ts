import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import {
  CompleteProfileDto,
  CreateUserDto,
  LoginUserDto,
} from "./dto/auth.dto";
import { Tokens, UserEmail, UserPayload } from "./types/tokens.types";
import { AuthRepository } from "./auth.repository";

@Injectable()
export class AuthService {
  constructor(private userRepository: AuthRepository) {}
  async signup(userData: CreateUserDto): Promise<Tokens> {
    const user = await this.verifyUserExists(userData.email);
    if (user) {
      throw new ConflictException("Email Already Taken!");
    }

    return this.userRepository.createUser(userData);
  }
  async verifyUserExists(email: string): Promise<UserEmail> {
    return this.userRepository.findUserByEmail(email);
  }
  async signIn(userData: LoginUserDto): Promise<Tokens> {
    const user = await this.verifyUserExists(userData.email);
    if (!user) {
      throw new NotFoundException("User with this email doesn't exist!");
    }

    return this.userRepository.userSignIn(userData);
  }

  completeProfile(
    userId: number,
    dto: CompleteProfileDto
  ): Promise<CompleteProfileDto> {
    return this.userRepository.completeProfile(userId, dto);
  }
  getProfileById(userId: number): Promise<UserPayload> {
    return this.userRepository.getProfileById(userId);
  }
}
