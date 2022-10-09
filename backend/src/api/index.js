import { Router } from "express";
import { accounts, user, board, comment, mariadbTest } from "./routes";

const app = Router();

// declare function imported
app.use("/accounts", accounts);
app.use("/user", user);
app.use("/board", board);
app.use("/career", career);

export default app;
