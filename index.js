const express = require("express");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const bodyParser = require("body-parser");
const cors = require("cors");

const configuration = new Configuration({
  organization: "org-QbaYuByWHgkNRgtaOz6RAxY2",
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 3080;

app.post("/", async (req, res) => {
  const { message, model } = req.body;
  const response = await openai.createCompletion({
    model: `${model}`, // "text-davinci-003"
    prompt: `${message}`,
    max_tokens: 250,
    temperature: 0.5,
  });
  console.log(response.data.choices[0].text);
  res.json({
    message: response.data.choices[0].text,
  });
});

app.get("/models", async (req, res) => {
  const response = await openai.listEngines();
  // console.log(response);
  res.json({
    models: response.data.data,
  });
});

app.listen(port, () => {
  console.log(`App listening at: http://localhost${port}`);
});
