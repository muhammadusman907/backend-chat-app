var express = require("express");
var cors = require("cors");
var http = require("http");
var mongoose = require("./db/index.js");
var authRouter = require("./router/routerAuth.js");
var userRouter = require("./router/userRouter.js").userRouter;
var messageRouter = require("./router/messageRouter.js").messageRouter;
require("dotenv/config");

console.log(process.env.PORT);

var app = express();
var server = http.createServer(app);

app.use(cors());
app.use(express.json());

var PORT = process.env.PORT;

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use(
  "/message",
  function (req, res, next) {
    next();
  },
  messageRouter
);

try {
  var db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error"));
  db.once("open", function () {
    console.log("connection successfully");
  });
} catch (error) {
  console.log("MongoDB connection");
}

var schema = new mongoose.Schema({ todo: String });
var todos = mongoose.model("todos", schema);

app.post("/", async function (req, res) {
  var todoRef = await todos.create({
    todo: req.body.value,
  });
  console.log("todo", req.body.value);
  res.send({ status: "user add" });
});

app.get("/", async function (req, res) {
  var getTodos = await todos.find();
  res.send(getTodos);
});

app.delete("/:id", async function (req, res) {
  var deleteSpecificUser = await todos.findByIdAndDelete({
    _id: req.params.id,
  });
  res.status(200).json(deleteSpecificUser);
});

app.patch("/:id", async function (req, res) {
  console.log("frontend value ---->", req.body);
  console.log(req.params.id);
  var result = await todos.findByIdAndUpdate(req.params.id, {
    $set: { todo: req.body.value },
  });
  console.log(result);
  res.send({
    status: "updates",
    id: req.params.id,
    result: result,
  });
});

server.listen(PORT, function () {
  console.log("server is running");
});

