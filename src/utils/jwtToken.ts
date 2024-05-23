import jwt from "jsonwebtoken";
import { UserResponseProps } from "./createTokenPayload";

export const createJwtToken = (payload: UserResponseProps) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY as string, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  return token;
};

export const validateJwtToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY as string);
};
