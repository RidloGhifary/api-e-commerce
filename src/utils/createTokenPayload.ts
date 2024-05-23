import { ObjectId } from "mongodb";

export interface UserResponseProps {
  _id: ObjectId;
  username: string;
  email: string;
  role: string;
  _v?: number;
}

const createTokenPayload = (user: UserResponseProps) => {
  return {
    _id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
  };
};

export default createTokenPayload;
