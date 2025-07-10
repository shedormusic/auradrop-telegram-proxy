const express = require("express");
const fetch = require("node-fetch");
const app = express();
require("dotenv").config();

app.use(express.json());

// ✅ Разрешаем все домены
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // или укажи свой домен
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.post("/send", async (req, res) => {
  const { text } = req.body;
  const chatId = process.env.CHAT_ID;
  const token = process.env.BOT_TOKEN;

  if (!text || !chatId || !token) {
    return res.status(400).json({ error: "Missing data" });
  }

  try {
    const telegramRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
      }),
    });

    const data = await telegramRes.json();
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
