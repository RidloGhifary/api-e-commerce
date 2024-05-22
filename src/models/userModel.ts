import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      require: [true, "Username cannot be blank"],
      unique: true,
      min: 3,
      max: 30,
    },
    email: {
      type: String,
      trim: true,
      require: [true, "Email cannot be blank"],
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Password cannot be blank"],
      minlength: 8,
    },
    role: {
      type: String,
      trim: true,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified(this.password)) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.method("comparePassword", async function (oldPassword) {
  const isPasswordMatch = await bcrypt.compare(oldPassword, this.password);
  return isPasswordMatch;
});

const UserModel = mongoose.model("UserModel", userSchema);
export default UserModel;
