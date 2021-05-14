const express = require("express");
const app = express();
const port = 5000;

// a middleware that enables us to read the received JSON data
app.use(express.json());



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
