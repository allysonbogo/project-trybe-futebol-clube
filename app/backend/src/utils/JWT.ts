import * as jwt from 'jsonwebtoken';
import { Token } from '../Interfaces';

export default class JWT {
  private static jwtSecret = process.env.JWT_SECRET || 'ash-ketchum';

  static createToken(payload: Token): string {
    return jwt.sign(payload, JWT.jwtSecret);
  }

  static verifyToken(token: string) {
    return jwt.verify(token, JWT.jwtSecret);
  }
}
