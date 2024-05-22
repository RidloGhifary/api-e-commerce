import express, { Application, Request, Response } from "express";

const app: Application = express();
const port: number = 5100;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server is running on PORT:${port}`);
});
