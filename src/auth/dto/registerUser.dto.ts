import * as Joi from 'joi';
import { userJoiSchema } from 'utils/validator/schema/user.validator';
import { ValidatorService } from '../../../utils/validator/validator.service';
import { User } from '../entities/user.entity';

const { getJoiSchema, getJoiSchemas } =
  ValidatorService.joiSchemaGenerator<User>(userJoiSchema);

export class RegisterUserDTO {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
}

export const vRegisterUserDto = Joi.object({
  ...getJoiSchemas(['username', 'password', 'email']),
  confirmPassword: getJoiSchema('password').valid(Joi.ref('password')),
});
