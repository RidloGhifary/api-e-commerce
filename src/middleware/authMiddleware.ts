import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../errors";
import { validateJwtToken } from "../utils";
import { UserResponseProps } from "../utils/createTokenPayload";
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user: UserResponseProps;
    }
  }
}

export const authenticateUser = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  try {
    const token = req.signedCookies.accessToken;
    if (!token) throw new UnauthorizedError("No token provided, please login");

    const validateTokenPayload = validateJwtToken(token);
    req.user = {
      _id: (validateTokenPayload as JwtPayload)._id,
      username: (validateTokenPayload as JwtPayload).username,
      email: (validateTokenPayload as JwtPayload).email,
      role: (validateTokenPayload as JwtPayload).role,
    };

    next();
  } catch (err) {
    next(err);
  }
};
