import express, { Application, Request, Response } from "express";
import { rateLimit } from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import cors from "cors";

const app: Application = express();
const port: number = 5100;

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

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server is running on PORT:${port}`);
});
