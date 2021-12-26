import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { access } from 'fs';
import { AuthService } from './auth.service';
import { Cookies } from './cookies.decorator';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { User } from './entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  create(@Body() createAuthDto: CreateAuthDto): Promise<void> {
    return this.authService.createUser(createAuthDto);
  }

  @Post('signin')
  async signIn(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<string> {
    const accessToken = await this.authService.signIn(loginUserDto);
    response.cookie('accessToken', accessToken);
    return accessToken;
  }

  // @Get('getsomething')
  // getSomething(@Req() request: Request): string {
  //   const accessToken = request.cookies['accessToken'];
  //   console.log(accessToken);
  //   if (!accessToken) {
  //     return 'Access Token not found';
  //   }
  //   return accessToken;
  // }

  @Get('user')
  getUser(@Cookies('accessToken') accessToken: string): Promise<User> {
    return this.authService.getUser(accessToken);
  }

  @Get('getsomething')
  getSomething(@Cookies('accessToken') accessToken: string): string {
    if (!accessToken) {
      return 'Access Token not found';
    }
    return accessToken;
  }
}
