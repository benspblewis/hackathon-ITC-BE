const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080 || process.env.PORT;
const chatRoute = require("./routes/chat");
const userRoute = require("./routes/user");

app.use(express.json());
app.use(cors());

app.use("/chat", chatRoute);
app.use("/user", userRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
