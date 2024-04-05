import express from "express";
import cors from "cors";
import { createServer } from "http";
import mongoose from "./db/index.js";
import authRouter from "./router/routerAuth.js";
import { userRouter } from "./router/userRouter.js";
import { messageRouter } from "./router/messageRouter.js";
import { Server } from "socket.io";
const app = express();
const server = createServer(app);
const io = new Server(server, {
  methods: ["GET", "POST"],
  cors: { origin: "*:*" },
});
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/message", (req, res, next) => next(), messageRouter);
io.on("connection", (socket) => {
  // console.log("socket id" , socket.id)
  socket.on("send_message", (message) => {
    console.log("message socket ----->", message);
    io.emit("receive_message", message);
  });
  // socket.on("TYPING", (typingIndctr) => {
  //   console.log(typingIndctr);
  //   io.emit("RECEIVE_TYPING", typingIndctr);
  // });

  // socket.on("TYPING_DISCONNECT", (dscntyping) => {
  //   console.log(dscntyping);
  //   io.emit("DISCONNECT_TYPING", dscntyping);
  // });
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
  // console.log(req.body);
  // user.push({ ...req.body, id: user.length });
  res.send({ staus: "user add" });
});
app.get("/", async (req, res) => {
  const getTodos = await todos.find();
  res.send(getTodos);
});
app.delete("/:id", async (req, res) => {
  // const deleteId = user.findIndex((v, i) => v.id == req.params.id);
  // // console.log(deleteId[0]);
  // const deleteItem = user.splice(deleteId, 1);
  const deleteSpecificUser = await todos.findByIdAndDelete({
    _id: req.params.id,
  });
  res.status(200).json(deleteSpecificUser);
  // res.send({
  //   status: "deleted",
  //   id: req.params.id,
  //   deleteItem,
  // });
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

// var deleteId = user.findIndex((v, i) => v.id == 2);
// console.log("my value", deleteId)
// console.log(user);

// BoYEcQG0GvRTwfPp;
// eCl74jT1ZRGwzwi1;
// mongodb+srv://muhammadusman90712:<password>@muhammadusman.q0cvumo.mongodb.net/
export { io };
