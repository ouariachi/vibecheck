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
  const lang = req.query.lang || "Spanish";
  const body = req.body;
  
  const validLangs = ['English', 'Spanish', 'Portuguese'];
  
  if(!validLangs.includes(lang)) {
    return res.status(400).json({ 
      error: 'The specified language is not valid. Only the languages "Spanish", "English", "Portuguese" are supported. Case sensitive.' 
    });
  }

  try {
    const rated = rate(lang, body);
    res.json(rated);
  } catch(e) {
    res.status(400).json({ error: e });
  }
});

function rate(lang = "Spanish", comments) {
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
  console.log("APP ESCUCHANDO EN EL PUERTO " + PORT);
});