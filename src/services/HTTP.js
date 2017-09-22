/**
 * Created by garusis on 24/08/17.
 */
import request from "request"
import {signTokenForRelatedService} from "./Auth"

export const HTTP_METHODS = {
  POST: "post",
  PUT: "put",
  GET: "get",
  DELETE: "delete"
}

/**
 * Send a HTTP Request using the more recommended structure to another emerge microservices.
 * @param {String} url
 * @param {Object} [body]
 * @param {String} [method]
 * @returns {Promise}
 */
export function sendMicroserviceRequest(url, body = {}, method = HTTP_METHODS.GET) {
  let reqData = {
    method: method,
    url: url,
    json: true,
    headers: {
      'Authorization': `Bearer ${signTokenForRelatedService()}`
    }
  }

  if (method === HTTP_METHODS.GET) {
    reqData.qs = body
  } else {
    reqData.body = body
  }

  return sendRequest(reqData)
}

export function sendRequest(config) {
  return new Promise(function (resolve, reject) {
    request(config, function (error, response, resBody) {
      if (!error && response && response.statusCode !== 200) {
        error = {message: resBody, code: response.statusCode}
      }

      if (error) {
        error.data = config.body || config.qs
        return reject(error)
      }
      resolve(resBody ? resBody.data || resBody : null)
    })
  })
}
