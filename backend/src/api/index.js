import { Router } from "express";
import { accounts, mariadbTest, board, career, image } from "./routes";

const app = Router();

// declare function imported
app.use("/accounts", accounts);
app.use("/board", board);
app.use("/career", career);
app.use("/", mariadbTest);
app.use("/image", image);

export default app;
