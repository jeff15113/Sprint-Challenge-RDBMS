const db = require("./dbConfig.js");
console.log("projects");
module.exports = {
  getById,
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
  let project = db("projects").where({ id });
  let actions = db("actions").where({ project_id: id });

  return Promise.all([project, actions]).then(results => {
    const [project, actions] = results;
    return { ...project, actions: [...actions] };
  });
}
