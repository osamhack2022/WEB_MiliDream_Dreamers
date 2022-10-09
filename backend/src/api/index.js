import { Router } from "express";
import { accounts, mariadbTest, board, career } from "./routes";

const app = Router();

// declare function imported
app.use("/accounts", accounts);
app.use("/board", board);
app.use("/career", career);

export default app;
