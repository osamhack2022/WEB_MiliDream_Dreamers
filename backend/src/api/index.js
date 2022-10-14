import { Router, static as serveStatic } from "express";
import express from "../loaders/express";
import { accounts, user, board, comment, image } from "./routes";

const app = Router();

// declare function imported
app.use("/accounts", accounts);
app.use("/user", user);
app.use("/board", board);
app.use("/", mariadbTest);
app.use(serveStatic("public"));
app.use("/image", image);
app.use("/comment", comment);


export default app;
