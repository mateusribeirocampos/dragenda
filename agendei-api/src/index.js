import express from "express";
import cors from "cors";
import routes from "./routes.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

if (process.env.NODE_ENV !== "test") {
  app.listen(3001, () => {
    console.log("Server is running on port 3001");
  });
}

export { app };