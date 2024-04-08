import express from "express";
import cors from "cors";
import { createServer } from "http";
import mongoose from "./db/index.js";
import authRouter from "./router/routerAuth.js";
import { userRouter } from "./router/userRouter.js";
import { messageRouter } from "./router/messageRouter.js";
import { Server } from "socket.io";
import "dotenv/config";
console.log(process.env.PORT);
const app = express();
const server = createServer(app);
const io = new Server(server, {
  methods: ["GET", "POST"],
  cors: { origin: "*" },
});
app.use(cors({ origin: "*", credentials: true, optionSuccessStatus: 200 }));
app.use(express.json());
const PORT = process.env.PORT;
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/message", (req, res, next) => next(), messageRouter);
io.on("connection", (socket) => {
  console.log("socket id", socket.id);
  socket.on("send_message", (message) => {
    console.log("message socket ----->", message);
    io.emit("receive_message", message);
  });
});

try {
  const db = mongoose.connection;
  db.on("error", console.error.bind("connection error"));
  db.once("open", () => {
    console.log("connection successfully");
  });
} catch (error) {
  console.log("MongoDB connection");
  //   res.send(error);
}

const schema = new mongoose.Schema({ todo: String });
const todos = mongoose.model("todos", schema);

app.post("/", async (req, res) => {
  const todoRef = await todos.create({
    todo: req.body.value,
  });
  console.log("todo", req.body.value);
  res.send({ staus: "user add" });
});
app.get("/", async (req, res) => {
  const getTodos = await todos.find();
  res.send(getTodos);
});
app.delete("/:id", async (req, res) => {
  const deleteSpecificUser = await todos.findByIdAndDelete({
    _id: req.params.id,
  });
  res.status(200).json(deleteSpecificUser);
});

app.patch("/:id", async (req, res) => {
  console.log("frontend value ---->", req.body);
  console.log(req.params.id);
  const result = await todos.findByIdAndUpdate(req.params.id, {
    $set: { todo: req.body.value },
  });
  console.log(result);
  res.send({
    status: "updates",
    id: req.params.id,
    result,
  });
});
server.listen(PORT, () => {
  console.log("server is running");
});

export { io, app };
