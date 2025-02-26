const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const noteSchema = new mongoose.Schema({
    content: String,
    tags: [String],
    color: String,
    createdAt: String
});
const Note = mongoose.model("Note", noteSchema);

mongoose.connect("mongodb+srv://user:password123@cluster0.mongodb.net/luffynotes?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected"));

app.get("/api/notes", async (req, res) => {
    const notes = await Note.find();
    res.json(notes);
});

app.post("/api/notes", async (req, res) => {
    const note = new Note(req.body);
    await note.save();
    res.status(201).json(note);
});

app.delete("/api/notes/:id", async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

app.listen(5000, () => console.log("Server running"));