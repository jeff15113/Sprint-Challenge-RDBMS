const express = require("express");

const db = require("../actionsDB");

const router = express.Router();

router.post("/", (req, res) => {
  const { project_id, description, notes, completed } = req.body;
  if (!description) {
    res.status(400).json({
      errorMessage: "Please provide a description for the action."
    });
    return;
  }
  if (!project_id) {
    res.status(400).json({
      errorMessage: "Project_id id not provided. Action can not be accepted."
    });
    return;
  }
  if (!notes) {
    res.status(400).json({
      errorMessage: "Please provide notes for the action."
    });
    return;
  }
  if (description.length > 256) {
    res.status(400).json({
      errorMessage:
        "Your description is too long, please shorten and try again."
    });
    return;
  }
  db.insert({
    project_id,
    description,
    notes
  })
    .then(response => {
      res.status(201).json(response);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "There was an error while saving the Action to the database"
      });
      return;
    });
});

router.get("/", (req, res) => {
  db.get()
    .then(Actions => {
      res.json({ Actions });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "The Actions information could not be retrieved."
      });
      return;
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.getById(id)
    .then(Actions => {
      if (Actions.length === 0) {
        res.status(404).json({
          message: "The Action with the specified ID does not exist."
        });
        return;
      }
      res.json({ Actions });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "The Actions information could not be retrieved."
      });
      return;
    });
});

module.exports = router;
