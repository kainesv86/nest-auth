import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';

import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { LoginUserDto } from '../dto/loginUser.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.authService.validateUser(loginUserDto);
    if (!user) {
      throw new UnauthorizedException('Username or password are incorrect');
    }

    return user;
  }
}
