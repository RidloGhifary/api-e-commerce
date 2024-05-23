import { Response } from "express";
import createTokenPayload, { UserResponseProps } from "./createTokenPayload";

const attachCookies = (res: Response, tokenPayLoad: UserResponseProps) => {
  const token = createTokenPayload(tokenPayLoad);
  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("accessToken", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
};

export default attachCookies;
