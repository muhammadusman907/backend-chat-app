const express = require("express");
const cors = require("cors");
const mongoose = require("./db/index.js");

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
  try {
    const user = await todos.find();
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

app.post("/", async (req, res) => {
  try {
    await todos.create({ todo: req.body.value });
    console.log("todo", req.body.value);
    res.send({ status: "user add" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

app.delete("/:id", async (req, res) => {
  try {
    await todos.findByIdAndDelete(req.params.id);
    res.send({
      status: "deleted",
      id: req.params.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

app.patch("/:id", async (req, res) => {
  try {
    await todos.findByIdAndUpdate(req.params.id, { todo: req.body.value });
    res.send({
      status: "updated",
      id: req.params.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
