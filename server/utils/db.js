const mongoose = require("mongoose");
// const URI = "mongodb://127.0.0.1:27017/task_and_todo"; for localhost
// const URI =
//   "mongodb+srv://vishalysko:sarkars@cluster0.cbifl0g.mongodb.net/task_and_todo?retryWrites=true&w=majority&appName=Cluster0";
const URI = process.env.MONGODB_URI;
const connectWithDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connection established with Database.");
  } catch (error) {
    console.log("Database connection failed");
    process.exit(0);
  }
};

module.exports = connectWithDb;
