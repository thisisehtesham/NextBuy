import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET = 'your_jwt_secret_key';

export const hashPassword = async (password) => await bcrypt.hash(password, 10);

export const comparePasswords = async (password, hashed) => await bcrypt.compare(password, hashed);

export const generateToken = (user) => jwt.sign({ email: user.email }, SECRET, { expiresIn: '1h' });

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
};
