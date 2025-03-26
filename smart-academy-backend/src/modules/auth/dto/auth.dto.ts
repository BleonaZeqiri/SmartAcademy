import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: "Password is too short!" })
  password: string;

  @IsOptional()
  @IsString()
  profile_picture: string;
}

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: "Password is too short!" })
  password: string;
}

export class CompleteProfileDto {
  @IsNotEmpty()
  @IsString()
  location: string;

  @IsString()
  @IsOptional()
  phone_number: string;

  @IsString()
  @IsOptional()
  about: string;

  @IsString()
  @IsOptional()
  profile_picture: string;
}
