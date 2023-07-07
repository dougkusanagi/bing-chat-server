import express from "express";
import multer from "multer";
import { configDotenv } from "dotenv";
import { BingChat } from "bing-chat";
configDotenv();

const app = express();
const variant = {
  Balanced: "Balanced",
  Precise: "Precise",
  Creative: "Creative",
};

app.post("/", multer().none(), async (req, res) => {
  try {
    const message = req.body.message;
    const conversationId = req.body.conversationId ?? null;
    const messageId = req.body.messageId ?? null;
    const api = new BingChat({ cookie: process.env.BING_COOKIE });
    const bing_response = await api.sendMessage(message, {
      variant: variant.Balanced,
      conversationId: conversationId,
      messageId: messageId,

      clientId: "1829581529941754",
      conversationSignature: "3Memu1mAGLwNVyzEowx8YvS42nR1YqrJHp3q80USaZY=",
      invocationId: "2",

      // onProgress: (partialResponse) => console.log(partialResponse.text),
    });

    res.send({
      response: bing_response.detail.text || "Sem resposta",
      conversationId: bing_response.conversationId,
      messageId: bing_response.detail.messageId,
    });
  } catch (error) {
    res.status(500).send("An error occurred.");
    console.error(error);
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Chatgpt server is running on http://localhost:${port}`);
});
