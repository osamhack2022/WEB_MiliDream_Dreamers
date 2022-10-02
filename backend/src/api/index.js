import { Router } from "express";
import { accounts, mariadbTest } from "./routes";

const app = Router();

// declare function imported
app.use("/accounts", accounts);
app.use("/", mariadbTest);

export default app;
