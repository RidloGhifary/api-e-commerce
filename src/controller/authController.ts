import { Request, Response, NextFunction } from "express";
import UserModel from "../models/userModel";
import * as EmailValidator from "email-validator";
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
      throw new Error("Please provide a valid email and password");

    const isValidEmail = EmailValidator.validate(email);
    if (!isValidEmail) throw new Error("Please provide a valid email");

    const currentUser = await UserModel.findOne({ email });
    if (!currentUser) throw new Error(`${email} has not registered yet`);

    const isPasswordCorrect = await bcrypt.compare(
      password,
      currentUser.password
    );
    if (!isPasswordCorrect) throw new Error("Wrong credentials, try again");

    const { password: pass, ...others } = currentUser;

    res.status(200).json(others);
  } catch (err) {
    next(err);
  }
};
