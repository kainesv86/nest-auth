import { User as UserExtend } from './src/auth/entities/user.entity';

declare global {
  namespace Express {
    interface User extends UserExtend {}
  }
}
