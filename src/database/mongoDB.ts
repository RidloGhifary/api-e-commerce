import mongoose from "mongoose";

const connectMongoDB = (url: string) => {
  return mongoose
    .connect(url)
    .then(() => console.log("Database connected"))
    .catch((error) => console.log("Database got some errors ", error));
};

export default connectMongoDB;
