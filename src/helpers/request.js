const Bluebird = require("bluebird");
const FormData = require("form-data");
const fetch = require("node-fetch");
const fs = require("fs");
const jwt = require("jsonwebtoken");

fetch.Promise = Bluebird;

module.exports = async (
  url,
  method = "post",
  body = {},
  path = null,
  headers
) => {
  body = method.toLowerCase() === "get" ? null : JSON.stringify(body);
  try {
    headers = {
      ...headers,
      "x-access-token": jwt.sign({}, process.env.SECRET, { expiresIn: "10s" }),
    };
    let response;
    if (path) {
      const fd = new FormData();

      for (const param in body) {
        fd.append(param, body[param]);
      }

      const { size: knownLength } = fs.statSync(path);
      const fileStream = fs.createReadStream(path);

      fd.append("file", fileStream, { knownLength });

      response = await fetch(url, {
        method,
        credentials: "include",
        body: fd,
        headers,
      });
    } else {
      headers = { "Content-Type": "application/json", ...headers };
      response = await fetch(url, { method, body, headers });
    }

    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e.message);
    return false;
  }
};
