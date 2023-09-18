let functions = require("firebase-functions");
// eslint-disable-next-line no-unused-vars
functions = functions.region("southamerica-east1");

const admin = require("firebase-admin");
admin.initializeApp();

const express = require("express");
const {onRequest} = require("firebase-functions/v1/https");
// const cookieParser = require("cookie-parser")();
const cors = require("cors")({origin: true});
// const axios = require("axios");
// const {env} = require("process");

const api = express();

api.use(cors);
// api.use(cookieParser);

api.get("v1/ola/aula", (req, res) => {
  return res.status(200).send({status: "ok"});
});

exports.widgets = onRequest(api);
