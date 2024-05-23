import { Request, Response, NextFunction } from "express";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../errors";
import * as EmailValidator from "email-validator";
import UserModel from "../models/userModel";
import bcrypt from "bcrypt";

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

    res.status(200).json(others);
  } catch (err) {
    next(err);
  }
};
