const express = require("express");
const mongoose = require("mongoose");
const Article = require("./models/article");

const app = express();
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://abdalrhmangamel681:11969255@cluster0.if3ja.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });

// TODO: Root Endpoint
app.get("/", (request, response) => {
  response.send("Start Learning Nodejs!");
});

// TODO: Articles Endpoints
app.get("/articles", async (request, response) => {
  const articles = await Article.find();
  response.json(articles);
});

app.get("/articles/:id", async (request, response) => {
  const id = request.params.id;
  try {
    const article = await Article.findById(id);
    if (!article) {
      return response.status(404).json({ message: "Article not found" });
    }
    response.json(article);
    return;
  } catch (err) {
    console.log("Error while reading article with id:", id, err);
    response.status(500).json({ message: "Server error", error: err.message });
  }
});

app.get("/showArticles", async (request, response) => {
  const articles = await Article.find();
  response.render("articles.ejs", { articles: articles });
});

app.post("/articles", async (request, response) => {
  const newArticle = new Article({
    title: request.body.title,
    body: request.body.body,
    numberOfLikes: request.body.numberOfLikes,
  });

  await newArticle.save();

  response.json({
    message: "The new article has been stored successfully",
  });
});

app.put("/articles/:id", async (request, response) => {
  const id = request.params.id;
  const body = request.body;

  try {
    const updatedArticle = await Article.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!updatedArticle)
      return response.status(404).json({ message: "Article not found" });
    response.json(updatedArticle);
  } catch (err) {
    console.error("Error while updating article with id:", id, err);
    response.status(500).json({ message: "Server error", error: err.message });
  }
});

app.delete("/articles/:id", async (request, response) => {
  const id = request.params.id;

  try {
    const deletedArticle = await Article.findByIdAndDelete(id);
    if (!deletedArticle)
      return response.status(404).json({ message: "Article not found" });
    response.json(deletedArticle);
  } catch (err) {
    console.error("Error while updating article with id:", id, err);
    response.status(500).json({ message: "Server error", error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
