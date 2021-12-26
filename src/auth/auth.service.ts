import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private userRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async createUser(createAuthDto: CreateAuthDto): Promise<void> {
    const { username, password, email } = createAuthDto;

    await this.userRepository.save({ username, password, email });
  }

  async signIn(loginUserDto: LoginUserDto): Promise<string> {
    const { username, password } = loginUserDto;
    const user = await this.userRepository.findOne({
      username,
    });

    if (!user || user.password !== password) {
      throw new UnauthorizedException('User or password incorrect');
    }

    const accessToken: string = await this.jwtService.sign({
      id: user.id,
      username: user.username,
      email: user.email,
    });

    return accessToken;
  }

  async getUser(accessToken: string): Promise<User> {
    const { id } = await this.jwtService.verifyAsync(accessToken);
    return await this.userRepository.findOne({ id });
  }

  async validateUser(loginUserDto: LoginUserDto): Promise<any> {
    const { username, password } = loginUserDto;
    const user = await this.userRepository.findOne(username);
    if (user && user.password === password) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  // findAll() {
  //   return `This action returns all auth`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
