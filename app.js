require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const app = express();

const { mailService } = require("./controllers/mailer.Controller");
const verifyEmailRequestBody = require("./middlewares/emailRequest.middleware");

const PORT = process.env.PORT || 3000; // Fallback to 3000 if PORT is not set

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});

// Middleware
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("You are using Mail Chimp");
});

//Global Error Handler
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

app.post("/send-emails", verifyEmailRequestBody,mailService);

//Global 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
