import { Router, static as serveStatic } from "express";
import { accounts, user, board, comment, image, objective } from "./routes/index.js";

const app = Router();

// declare function imported
app.use("/accounts", accounts);
app.use("/user", user);
app.use("/board", board);
app.use(serveStatic("public"));
app.use("/image", image);
app.use("/comment", comment);
app.use("/objective", objective);

export default app;
