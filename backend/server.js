const express = require("express");
const app = express();
const port = 3000;

app.get('/api/v1/users', (req, res) => {
  res.download("server.js");
});




app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
