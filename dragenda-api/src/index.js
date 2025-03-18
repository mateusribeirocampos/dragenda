import express from "express";
import cors from "cors";
import routes from "./routes.js";
import dotenv from 'dotenv';

dotenv.config({ path: "./src/.env" });

const app = express();

app.use(express.json());
app.use(cors({
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Accept-Version', 'Content-Length', 'Content-MD5', 'Date', 'X-Api-Version'],
  credentials: true
}));
app.use(routes);

const PORT = process.env.PORT || process.env.EXPO_PUBLIC_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
