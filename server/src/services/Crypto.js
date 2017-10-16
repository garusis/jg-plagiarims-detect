/**
 * Created by garusis on 25/08/17.
 */
import {createCipher, createDecipher} from 'crypto'

export function encrypt(text) {
  let cipher = createCipher(process.env.JG_CRYPTO_ALGORITHM, process.env.JG_CRYPTO_PASSWORD)
  let crypted = cipher.update(text, 'utf8', 'hex')
  crypted += cipher.final('hex')
  return crypted
}


export function decrypt(text) {
  let decipher = createDecipher(process.env.JG_CRYPTO_ALGORITHM, process.env.JG_CRYPTO_PASSWORD)
  let dec = decipher.update(text, 'hex', 'utf8')
  dec += decipher.final('utf8')
  return dec
}
