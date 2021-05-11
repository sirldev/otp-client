const express = require("express");
const app = express();
const port = 3000;
const session = require("express-session");

const speakeasy = require("speakeasy");
const QRCode = require("qrcode");

app.use(
  session({
    secret: "@#@$MYSIGN#@$#$",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.json())


app.get("/qr", (req, res) => {
  let result = {}
  const secret = speakeasy.generateSecret({
    length: 10,
    name: "test@test.com",
    algorithm: "sha512",
  });

  sess = req.session;
  sess.secret = secret;

  var url = speakeasy.otpauthURL({
    secret: secret.ascii,
    issuer: "TEST",
    label: "jhha@stealien.com",
    algorithm: "sha512",
    period: 30,
  });

  QRCode.toDataURL(url, function (err, image_data) {
    console.log(image_data); // A data URI for the QR code image
    res.json({
      "img": image_data
    })
  });
});

app.post("/auth", (req, res) => {
  sess = req.session;
  console.log(sess.secret);

  console.log(req.body.token);

  var verified = speakeasy.totp.verify({
    secret: sess.secret.base32,
    encoding: "base32",
    algorithm: "sha512",
    token: req.body.token,
  });

  res.json({
    "loggedIn": verified
  })
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
