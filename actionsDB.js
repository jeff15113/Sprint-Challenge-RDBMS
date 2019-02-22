const db = require("./dbConfig.js");
console.log("action");
module.exports = {
  getById,
  insert
};

function insert(action) {
  return db("actions")
    .insert(action)
    .then(ids => {
      return getById(ids[0]);
    });
}

function getById(id) {
  return db("actions")
    .where({ id })
    .first();
}
