const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const cookieParser = require("cookie-parser");

const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

const RSA_PRIVATE_KEY = fs.readFileSync("./private.key", "utf8");

const validateEmailAndPassword = () => {
  return true;
};

const findUserIdForEmail = (email) => {
  return "123";
};

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  if (validateEmailAndPassword()) {
    const userId = findUserIdForEmail(email);
    const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
      algorithm: "RS256",
      expiresIn: 120,
      subject: userId,
    });
    res.cookie("SESSIONID", jwtBearerToken, { httpOnly: false, secure: false });
    res.send({
      message: "Cookie Set",
    });
  } else {
    res.status(401).send();
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
