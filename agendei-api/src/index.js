import express from "express";
import cors from "cors";
import routes from "./routes.js";
import dotenv from 'dotenv';

dotenv.config({ path: "./src/.env" });

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

export { app };