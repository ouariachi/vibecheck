const { configDotenv } = require("dotenv");
const express = require("express");
const natural = require("natural");
const { requestLimitMiddleware } = require("./middlewares");
const { langs } = require("./langs");

configDotenv();

const app = express();
app.use(express.json());
app.use(express.static("public"));

const Analyzer = natural.SentimentAnalyzer;
const stemmer = natural.PorterStemmer;

app.use(requestLimitMiddleware);

app.post("/api/rate", (req, res) => {
  const queryLang = req.query.lang || "English";
  const body = req.body;
  
  const lang = langs[queryLang.toUpperCase()];

  if(!lang) return res.status(400).json({ 
    error: 'The specified language is not valid. Only English (english or en) is supported.'  
  });

  try {
    const rated = rate(lang, body);
    console.log(rated)
    res.json(rated);
  } catch(e) {
    console.log(e);
    res.status(400).json({ error: e });
  }
});

function rate(lang = "English", comments) {
  const analyzer = new Analyzer(lang, stemmer, "afinn");

  const data = [];
  for(let comment of comments) {
    let content = comment;

    if(typeof content !== "string") {
      content = comment.content;
      if(!content) throw new Error("Invalid comment.");
    } 

    const words = content.split(" ");
    const rating = analyzer.getSentiment(words);
    data.push({ content, rating });
  }
  return data;
}

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("APP LISTENING ON PORT: " + PORT);
});