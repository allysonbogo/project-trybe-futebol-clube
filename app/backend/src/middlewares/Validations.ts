import { Request, Response, NextFunction } from 'express';
import { ILogin } from '../Interfaces/Users/IUser';
import JWT from '../utils/JWT';

class Validations {
  private static passwordMinLength = 6;
  private static emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body as ILogin;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    if (!Validations.emailRegex.test(email) || password.length < Validations.passwordMinLength) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    next();
  }

  static validateToken(req: Request, res: Response, next: NextFunction): Response | void {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const token = authorization.split(' ')[1];

    try {
      const decoded = JWT.verifyToken(token);
      if (!decoded) throw new Error('Token must be a valid token');

      next();
    } catch (e) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}

export default Validations;
