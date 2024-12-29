const express = require("express");

const cors = require("cors");
require("dotenv").config();
require("./models/db")


const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;
const usersRouter=require("./routes/user")
const rolesRouter=require("./routes/roles")
const coursesRouter=require("./routes/courses")
const lessoneRouter =require("./routes/lessons")
const commentsRouter=require("./routes/comments")
app.use("/users",usersRouter)
app.use("/roles",rolesRouter)
app .use("/course",coursesRouter)
app.use("/lessons",lessoneRouter)
app.use("/comments",commentsRouter)




// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
