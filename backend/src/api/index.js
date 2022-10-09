import { Router } from "express";
import { accounts, user, board, comment, carrer } from "./routes";

const app = Router();

// declare function imported
app.use("/accounts", accounts);
app.use("/user", user);
app.use("/board", board);
app.use("/comment", comment);
app.use("/carrer", carrer);

export default app;
