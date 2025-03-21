const mongoose = require("mongoose");

const schema = mongoose.Schema;

const articleSchema = new schema({
  title: String,
  body: String,
  numberOfLikes: Number,
});

const article = mongoose.model("Article", articleSchema);

module.exports = article;