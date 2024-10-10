const router = require("express").Router();
const Notes = require("../Models/Notes");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../Middleware/fetchuser");

//fetch allnotes
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.json(notes);
});

//addnotes
router.post("/addnotes", fetchuser,
  [
    body("title").isLength({ min: 3 }),
    body("description").isLength({ min: 3 }),
  ],
  async (req, res) => {

    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveNotes = await note.save();
      res.json(saveNotes);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Occured");
    }
  }
);

//Update exixting notes
router.put("/updatenotes/:id", fetchuser, [], async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    //create a new note
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // find the note to be updated and update it
    const note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note.title = newNote.title;
    note.description = newNote.description;
    note.tag = newNote.tag;
    await note.save();
    res.json({ note });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Occured");
  }
});

//Delete exixting note
router.delete("/deletenotes/:id", fetchuser, [], async (req, res) => {
  try {
    // find the note to be deleted and delete it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({"Success":"Note has been deleted",note:note})

  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Occured");
  }
});


module.exports = router;
