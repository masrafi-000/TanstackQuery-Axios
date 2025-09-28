import cors from "cors";
import express, { Application, Request, Response } from "express";
import connectDB from "./configs/db";
import postRoutes from "./routes/posts.route";

const app: Application = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
connectDB();

app.use("/api", postRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
