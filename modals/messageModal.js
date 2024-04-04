import mongoose from "../db/index.js";
const { Schema, model } = mongoose;

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
export { MessageModal };
