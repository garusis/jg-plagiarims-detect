import "babel-polyfill"
import express from "express"
import helmet from "helmet"
import morgan from "morgan"
import {json} from "body-parser"

import api from "./api"

const app = express()
app.use(helmet())
app.use(morgan('combined'))
app.use(json())

app.use(api)

const port = process.env.NODE_ENV === "local" ? process.env.API_PORT : process.env.PORT
app.listen(port || 3000, function () {
  console.log(`listening in ${port}`)
})
