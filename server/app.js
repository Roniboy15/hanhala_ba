const express = require("express");
const path = require("path");
const http = require("http");
const cors = require("cors");

const {routesInit} = require("./routes/configRoutes");
const fileUpload = require("express-fileupload");
require("./db/mongoConnect")

const app = express();

app.use(cors());
app.use(fileUpload({
    limits: {fileSize: 1024 * 1024 * 5}
}))

app.use(express.json());

app.use(express.static(path.join(__dirname,"public")));

routesInit(app);

const server = http.createServer(app);

let port = process.env.PORT || 3006;

server.listen(port);
console.log(`Server listens on port ${port}`);
