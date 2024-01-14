const { configDotenv } = require("dotenv");
const express = require("express");
const natural = require("natural");
const { requestLimitMiddleware } = require("./middlewares");

configDotenv();

const app = express();
app.use(express.json());
app.use(express.static("public"));

const Analyzer = natural.SentimentAnalyzer;
const stemmer = natural.PorterStemmer;

app.use(requestLimitMiddleware);

app.post("/rate", (req, res) => {
  const lang = req.query.lang || "English";
  const body = req.body;
  
  const validLangs = ['english'/*, 'spanish', 'portuguese'*/];
  
  if(!validLangs.includes(lang.toLowerCase())) return res.status(400).json({ 
    error: 'The specified language is not valid. Only English is supported.' 
  });

  try {
    const rated = rate(lang, body);
    res.json(rated);
  } catch(e) {
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
    data.push({ comment, rating });
  }
  return data;
}

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("APP LISTENING ON PORT: " + PORT);
});