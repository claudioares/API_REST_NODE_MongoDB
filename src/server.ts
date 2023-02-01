import express from "express";
import {routes} from "./routes";
import Loaders from "./loaders";

var cors = require('cors')

const app = express()

app.use(express.json())
app.use(express.static('public'))

Loaders.start()

app.use(cors())

app.use(routes);


app.listen(3000, ()=>{
    console.log('estamos on!')
})