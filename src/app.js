const express = require("express");
const { connectDB, serverConfig } = require("./config");
const cors=require("cors");
const app = express();
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const v1Router = require("./routes/v1/index.router");

app.use("/api/v1", v1Router);

connectDB().then(() => {
    console.log("Database connectted successfully");
    app.listen(serverConfig.PORT, () => {
        console.log("sever is listening to the port ");
    });

}).catch((err) => {
    console.log("Database is not connected successfully ");
});
