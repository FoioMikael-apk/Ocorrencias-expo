import "reflect-metadata";
import express from "express";
import cors from "cors";
import path from "path";
import { AppDataSource } from "../ormconfig";
import { router } from "./routes";

AppDataSource.initialize().then(() => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

  app.use(router);

  app.listen(3333, () => console.log("🚀 Backend rodando na porta 3333"));
});
