import express from "express";
import Router from "./routes/index"
import { errorHandler } from "./middelwares/errorHandler"

export const app = express();
app.use(express.json());

app.use("/api", Router);

// app.get('/', isAuth, controller)

// err handler
app.use(errorHandler);