import { MessageModal } from "../modals/messageModal.js";
import OpenAI from "openai";
import { io } from "../index.js";
const addMessage = async (req, res) => {
  const {
    message,
    currentUserId,
    margeId,
    senderUserId,
    currentUserDetail,
    senderUserDetail,
  } = req.body.body;
  // console.log(req.body.body);
  const sendMessage = await MessageModal.create({
    message,
    currentUserId,
    margeId,
    senderUserId,
    currentUserDetail,
    senderUserDetail,
  });
  res.send({ status: "add message successfully", sendMessage });
};
const getMessages = async (req, res) => {
  // console.log(req.params.id);
 
  // const realtimeMessage = MessageModal.watch();
  // realtimeMessage.on( "change", (data) => {
  //   console.log("realtime data ----->", data)
  //       io.emit("MESSAGE", data);
  //  });
  // res.send({realtimeMessage});
  const getMessages = await MessageModal.find({ margeId: req.params.id });

  if (getMessages) {
    res.status(200).send({
      getMessages,
    });
  } else {
    res.status(400).send({
      messges: "not found",
    });
  }
};
export { addMessage, getMessages };
