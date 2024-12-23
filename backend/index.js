import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import subGreddiitRoutes from "./routes/subGreddit.js";
import mySubGreddiitRoutes from "./routes/mySubGreddit.js";
import homeRoutes from "./routes/home.js";
import profileRoutes from "./routes/profile.js";
import postRoutes from "./routes/posts.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/mySubGreddiit", mySubGreddiitRoutes);
app.use("/home", homeRoutes);
app.use("/profile", profileRoutes);
app.use("/subGreddiit", subGreddiitRoutes);
app.use("/posts", postRoutes)

const CONNECTION_URL =
  "mongodb+srv://khushe_1703:khushe_1703@cluster0.vb0of5m.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose.set("strictQuery", true);
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));
