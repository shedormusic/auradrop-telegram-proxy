const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
const port = process.env.PORT || 3000;

const TOKEN = "7780266328:AAGHL0uAigkFJu43nVlekat0vdnyUbT4l7M";

app.use(cors());
app.use(bodyParser.json());

app.post("/send", async (req, res) => {
  const { chat_id, text } = req.body;

  try {
    const response = await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      chat_id,
      text,
      parse_mode: "HTML"
    });

    res.status(200).json({ success: true, data: response.data });
  } catch (err) {
    console.error("Ошибка при отправке:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});