const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("hey express what's up");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});