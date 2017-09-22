/**
 * Created by garusis on 23/08/17.
 */
import {sign, verify} from "jsonwebtoken"

/**
 * Create a token for the specified payload using the especified options.
 * @param {Object} [payload]
 * @param {Object} [options={"algorithm":"HS256"}]
 * @returns {String}
 */
export function signToken(payload, options = {algorithm: "HS256"}) {
  return sign(payload, process.env.JWT_SECRET_KEY, options)
}

/**
 * Create a token for the specified payload using the recommended settings to communicate with another JG
 * microservices.
 * @param {Object} [payload]
 * @returns {String}
 */
export function signTokenForRelatedService(payload = {}) {
  payload.service = process.env.APP_NAME

  return signToken(payload, {
    expiresIn: "1h",
    algorithm: "HS256",
    issuer: process.env.JWT_ISSUER
  })
}

/**
 * Middleware to allow check is an request comes with a valid token (time and sign) an if  it comes from another JGS
 * microservice. JG microservices uses the same JWT_SECRET_KEY and JTW_ISSUER and that allow us check this.
 * @param req
 * @param res
 * @param next
 */
export function isRelatedService(req, res, next) {
  let token = req.headers.authorization
  try {
    token = token.split(" ")[1]
    req.authData = verify(token, process.env.JWT_SECRET_KEY, {
      algorithms: ["HS256"],
      issuer: process.env.JWT_ISSUER
    })
    next()
  } catch (err) {
    res.sendStatus(401)
  }
}
