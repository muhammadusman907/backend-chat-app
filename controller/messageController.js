const { MessageModal } = require("../modals/messageModal.js");
const OpenAI = require("openai");
const { io } = require("../index.js");

const addMessage = async (req, res) => {
  const {
    message,
    currentUserId,
    margeId,
    senderUserId,
    currentUserDetail,
    senderUserDetail,
  } = req.body.body;

  try {
    const sendMessage = await MessageModal.create({
      message,
      currentUserId,
      margeId,
      senderUserId,
      currentUserDetail,
      senderUserDetail,
    });
    res.send({ status: "add message successfully", sendMessage });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

const getMessages = async (req, res) => {
  try {
    const getMessages = await MessageModal.find({ margeId: req.params.id });
    if (getMessages) {
      res.status(200).send({ getMessages });
    } else {
      res.status(400).send({ messges: "not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

module.exports = { addMessage, getMessages };
