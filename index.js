const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.post("/chat", (req, res) => {
  const prompt = req.body.prompt;

  axios
    .post("https://api.openai.com/v1/engines/text-davinci-002/completions", {
      prompt: prompt,
      max_tokens: 1024,
      n: 1,
      stop: null,
      temperature: 0.5
    }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_API_KEY"
      }
    })
    .then(response => {
      res.json({
        chatbotMessage: response.data.choices[0].text
      });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({
        error: "Error generating chatbot response"
      });
    });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Chatbot server listening on port ${port}`);
});
