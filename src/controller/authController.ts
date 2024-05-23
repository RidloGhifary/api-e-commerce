import { Request, Response, NextFunction } from "express";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../errors";
import * as EmailValidator from "email-validator";
import UserModel from "../models/userModel";
import bcrypt from "bcrypt";
import { attachCookies, createTokenPayload } from "../utils";
import { UserResponseProps } from "../utils/createTokenPayload";

export const Login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      body: { email, password },
    } = req;

    if (!email || !password)
      throw new BadRequestError("Please provide a valid email and password");

    const isValidEmail = EmailValidator.validate(email);
    if (!isValidEmail)
      throw new BadRequestError("Please provide a valid email");

    const currentUser = await UserModel.findOne({ email });
    if (!currentUser)
      throw new NotFoundError(`${email} has not registered yet`);

    const isPasswordCorrect = await bcrypt.compare(
      password,
      currentUser.password
    );
    if (!isPasswordCorrect)
      throw new UnauthorizedError("Wrong credentials, try again");

    const { password: pass, ...others } = currentUser;

    const tokenPayload = createTokenPayload(others as UserResponseProps);
    attachCookies(res, tokenPayload);

    res.status(200).json({ user: tokenPayload });
  } catch (err) {
    next(err);
  }
};
