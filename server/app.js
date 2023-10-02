const express = require("express");
const config = require("config");
const chalk = require("chalk");
const mongoose = require("mongoose");
const cors = require("cors")
const routes = require("./routes/index");
const path = require("path");
// const initDatabase = require("./startUp/initialDataDase");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/api", routes)


const PORT = config.get("port") ?? 8080;

if (process.env.NODE_ENV === "production"){
  app.use("/", express.static(path.join(__dirname, "client")));
  const indexPath = path.join(__dirname, "client", "index.html");
  app.get("*", (req, res) => {res.sendFile(indexPath)})
}
async function start() {
  try {    
    // mongoose.connection.once("open", () => {
    //         initDatabase();
    //     });
    await mongoose.connect(config.get("mongoUri"));

    console.log(chalk.green(`MongoBb connected...`))
    app.listen(PORT, () =>
      console.log(chalk.green(`Server has been started on port ${PORT}...`))
    );
  } catch (error) {
    console.log(chalk.red(error.message));
    process.exit(1);
  }
}
start()

// if(process.env.NODE_ENV === "production"){
//     console.log(1)
// } else {
//     console.log(2)
// }
