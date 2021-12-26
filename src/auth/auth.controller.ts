import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginUserDto } from './dto/loginUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  create(@Body() createAuthDto: CreateAuthDto): Promise<void> {
    return this.authService.createUser(createAuthDto);
  }

  @Post('signin')
  signIn(@Body() loginUserDto: LoginUserDto): Promise<string> {
    return this.authService.signIn(loginUserDto);
  }
}
