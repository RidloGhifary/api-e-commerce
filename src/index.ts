import express, { Application, Request, Response } from "express";
import connectMongoDB from "./database/mongoDB";
import { rateLimit } from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";

// ? MOCK_DATA
import mockDataUsers from "./mockData/users.json";
import mockDataProducts from "./mockData/products.json";
import mockDataOrders from "./mockData/orders.json";
import mockDataReviews from "./mockData/reviews.json";

// ? ROUTER
import authRouter from "./router/authRouter";

const app: Application = express();
const port: number = 5100;
dotenv.config();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(limiter);
app.use(mongoSanitize());
app.use(express.static("./public"));

const mockData = [
  {
    users: [...mockDataUsers],
    products: [...mockDataProducts],
    review: [...mockDataReviews],
    orders: [...mockDataOrders],
  },
];

app.get(`${process.env.API_BASE_URL}/mock-data`, (_, res: Response) => {
  res.status(200).send(mockData);
});

app.use(`${process.env.API_BASE_URL}/auth`, authRouter);

const startServer = async () => {
  try {
    await connectMongoDB(process.env.MONGODB_STR as string);
    app.listen(port, () => {
      console.log(`Server is running on PORT:${port}`);
    });
  } catch (err) {
    console.log("🚀 ~ startServer ~ err:", err);
  }
};

startServer();
