import * as Joi from 'joi';
import { StringVnLang } from 'joi-vn-lang';
import { User } from 'src/auth/entities/user.entity';

export function userJoiSchema(field: keyof User) {
  switch (field) {
    case 'username':
      return Joi.string()
        .min(5)
        .max(40)
        .trim()
        .lowercase()
        .required()
        .messages(StringVnLang);
    case 'password':
      return Joi.string()
        .min(5)
        .max(40)
        .trim()
        .lowercase()
        .alphanum()
        .required()
        .messages(StringVnLang);
    case 'email':
      return Joi.string().min(5).max(40).email().messages(StringVnLang);
  }
}
