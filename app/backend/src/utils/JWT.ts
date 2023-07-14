import * as jwt from 'jsonwebtoken';
import { Token } from '../Interfaces';

export default class JWT {
  private jwtSecret = process.env.JWT_SECRET || 'ash-ketchum';

  createToken(payload: Token): string {
    return jwt.sign(payload, this.jwtSecret);
  }

  decodeToken(token: string) {
    return jwt.verify(token, this.jwtSecret);
  }
}
