const mongoose = require("../db/index.js");
const Schema = mongoose.Schema;
const model = mongoose.model;

const messageSchema = new Schema(
  {
    message: String,
    margeId: String,
    currentUserId: String,
    senderUserId: String,
    currentUserDetail: Object,
    senderUserDetail: Object,
  },
  {
    timestamps: true,
  }
);

const MessageModal = model("messages", messageSchema);
exports.MessageModal = MessageModal;
