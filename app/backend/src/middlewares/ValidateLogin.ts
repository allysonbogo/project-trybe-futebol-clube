import { Request, Response, NextFunction } from 'express';
import { ILogin } from '../Interfaces/Users/IUser';

export default class Validations {
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
}
