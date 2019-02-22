const express = require("express");

const db = require("../projectsDB");

const router = express.Router();

router.post("/", (req, res) => {
  const { name, description } = req.body;
  if (!description) {
    res.status(400).json({
      errorMessage: "Please provide a description for the project."
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
    name,
    description
  })
    .then(response => {
      res.status(201).json(response);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "There was an error while saving the project to the database"
      });
      return;
    });
});

router.get("/", (req, res) => {
  db.get()
    .then(projects => {
      res.json({ projects });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "project list could not be retrieved."
      });
      return;
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.getById(id)
    .then(project => {
      if (project.length === 0) {
        res.status(404).json({
          message: "That project does not exist."
        });
        return;
      }
      res.json({ project });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "project could not be retrived"
      });
      return;
    });
});

module.exports = router;
