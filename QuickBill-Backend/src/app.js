const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./routes/userRoutes");
const {pool} = require("./database/db");
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());

app.use(cors());
// Routes
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use("/users", userRouter);

//middleware
// app.use((req, res, next) => {
//   //allow access to current url. work for https as well
//   // res.setHeader('Access-Control-Allow-Origin','*');
//   // res.removeHeader('x-powered-by');
//   // //allow access to current method
//   // res.setHeader('Access-Control-Allow-Methods',req.method);
//   // res.setHeader('Access-Control-Allow-Headers','Content-Type');
//   next();
// })
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to database");
  connection.release();
});

//handle error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
