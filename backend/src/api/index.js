import { Router } from "express";
import { accounts, user, board, comment } from "./routes";

const app = Router();

// declare function imported
app.use("/accounts", accounts);
app.use("/user", user);
app.use("/board", board);
app.use("/comment", comment);

export default app;
