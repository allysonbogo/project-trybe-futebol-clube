import * as bcrypt from 'bcryptjs';

const validPassword = 'secret_password';
const validEmail = 'allyson@admin.com';

const SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS || 10;

const user = {
  id: 1,
  username: 'Allyson',
  role: 'admin',
  email: validEmail,
  password: bcrypt.hashSync(validPassword, SALT_ROUNDS),
};

const users = [user];

const validLoginBody = {
  email: validEmail,
  password: validPassword,
};

const invalidLoginBody = {
  email: validEmail,
  password: 'wrong_password',
};

export {
  user,
  users,
  validLoginBody,
  invalidLoginBody,
};