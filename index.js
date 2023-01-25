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

// app.listen(port, () => {
//   console.log(`Listening on port ${port}`);
// });

///

dbConnection.migrate
.latest()
.then((migration) =>{
  if(migration){
    console.log('Connected to DB', migration);
    app.listen(port, ()=>{
      console.log(`Server is listening on port ${port}`)
    })
  }
})
.catch((err)=> {
  console.log(err)
   return process.exit(1)})
