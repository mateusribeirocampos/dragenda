import express from "express";
import cors from "cors";
import routes from "./routes.js";
import dotenv from 'dotenv';

dotenv.config({ path: "./src/.env" });

const app = express();

app.use(express.json());
app.use(cors({
  origin: ['https://dragenda-web.vercel.app', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(routes);

const PORT = process.env.PORT || process.env.EXPO_PUBLIC_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
