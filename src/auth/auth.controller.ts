import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { UserGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Cookies } from './cookies.decorator';
import { RegisterUserDTO, vRegisterUserDto } from './dto/registerUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { User } from './entities/user.entity';
import { JoiValidationPipe } from 'utils/validator/validator.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UsePipes(new JoiValidationPipe(vRegisterUserDto))
  create(@Body() createAuthDto: RegisterUserDTO): Promise<void> {
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

  @Post('logout')
  @UseGuards(UserGuard)
  async cLogout(@Req() req: Request, @Res() res: Response) {
    await res.cookie('accessToken', '', { maxAge: -999 }).send();
  }

  @UseGuards(UserGuard)
  @Get('user')
  getUser(@Req() req: Request): User {
    return req.user;
  }

  @Get('getsomething')
  getSomething(@Cookies('accessToken') accessToken: string): string {
    if (!accessToken) {
      return 'Access Token not found';
    }
    return accessToken;
  }
}
