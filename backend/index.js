const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const cookieParser = require("cookie-parser");

const app = express();
const port = 3000;

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
      expiresIn: 10,
      subject: userId,
    });
    res.cookie("SESSIONID", jwtBearerToken, {
      httpOnly: false,
      secure: false,
    });
    res.send({
      message: "Cookie Set",
    });
  } else {
    res.status(401).send();
  }
});

app.get("/api/validate",(req,res)=>{

  const token = req.cookies.SESSIONID;
  //console.log(req.cookies);
  if(!token){
    res.status(401).send();
  }
  const tokendecode = jwt.decode(token,{
    algorithm: "RS256",
});
console.log(tokendecode.exp*1000);
console.log(Date.now());

if(tokendecode.exp*1000 > Date.now()){
  res.json("No expiro");  
   
}else{
  
  res.status(401).send();
}
  
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
