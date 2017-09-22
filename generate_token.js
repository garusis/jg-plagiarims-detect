const jwt = require("jsonwebtoken")
let token = jwt.sign({service: "test_token"}, process.env.JWT_SECRET_KEY, {
  expiresIn: "1h",
  algorithm: "HS256",
  issuer: process.env.JWT_ISSUER
})
console.log(`Bearer ${token}`)
