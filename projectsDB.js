const db = require("./dbConfig.js");
console.log("projects");
module.exports = {
  getById,
  getProjectByID,
  insert
};

function insert(project) {
  console.log(project);
  return db("projects")
    .insert(project)
    .then(ids => {
      return getById(ids[0]);
    });
}

function getById(id) {
  return db("projects")
    .where({ id })
    .first();
}

function getProjectByID(id) {}
