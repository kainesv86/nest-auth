import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/user.entity';

const DBConfig = TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  username: 'root',
  password: '1234567890Aa',
  database: 'nest_auth',
  synchronize: true,
  keepConnectionAlive: true,
  entities: [User],
});

@Module({
  imports: [DBConfig, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
