import jwt from 'jsonwebtoken';

export const sign = payload => jwt.sign(
  payload,
  process.env.JWT_SECRET,
  { expiresIn: Number(process.env.JWT_LIFE) },
);

export const verify = token => jwt.verify(token, process.env.JWT_SECRET);
export const decode = token => jwt.decode(token);
