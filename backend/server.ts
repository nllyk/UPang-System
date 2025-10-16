import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to local MongoDB
mongoose.connect("mongodb://localhost:27017/mydatabase")
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Example schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: String
});

const User = mongoose.model("User", UserSchema);

// Example route (add user)
app.post("/api/users", async (req, res) => {
  const { name, email } = req.body;
  const newUser = new User({ name, email });
  await newUser.save();
  res.json({ message: "User saved!" });
});

// Example route (get all users)
app.get("/api/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
