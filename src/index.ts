import express, { Application, Request, Response } from "express";
import { rateLimit } from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import cors from "cors";

// ? MOCK_DATA
import mockDataUsers from "./mockData/users.json";
import mockDataProducts from "./mockData/products.json";
import mockDataOrders from "./mockData/orders.json";
import mockDataReviews from "./mockData/reviews.json";

const app: Application = express();
const port: number = 5100;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

const mockData = [
  {
    users: [...mockDataUsers],
    products: [...mockDataProducts],
    review: [...mockDataReviews],
    orders: [...mockDataOrders],
  },
];

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(limiter);
app.use(mongoSanitize());
app.use(express.static("./public"));

const startServer = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server is running on PORT:${port}`);
    });
  } catch (err) {
    console.log("🚀 ~ startServer ~ err:", err);
  }
};

startServer();
