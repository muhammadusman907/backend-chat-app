import express from "express";
import cors from "cors";
import mongoose from "./db/index.js";

const app = express();
const PORT = process.env.PORT || 5000;

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("connection successfully");
});

app.use(cors());
app.use(express.json());

const schema = new mongoose.Schema({ todo: String });
const todos = mongoose.model("todos", schema);

app.get("/", async (req, res) => {
  const user = await todos.find();
  res.send(user);
});

app.post("/", async (req, res) => {
  await todos.create({
    todo: req.body.value,
  });
  console.log("todo", req.body.value);
  res.send({ status: "user add" });
});

app.delete("/:id", async (req, res) => {
  await todos.findByIdAndDelete(req.params.id);
  res.send({
    status: "deleted",
    id: req.params.id,
  });
});

app.patch("/:id", async (req, res) => {
  await todos.findByIdAndUpdate(req.params.id, { todo: req.body.value });
  res.send({
    status: "updated",
    id: req.params.id,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
