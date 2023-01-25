const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080 || process.env.PORT;
const dbConnection = require("./knex/knex");

const chatRoute = require("./routes/Chat");
const userRoute = require("./routes/User");
app.use(express.json());
app.use(cors());

app.use("/chat", chatRoute);
app.use("/user", userRoute);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
