const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

function validateProjectId(req,res,next){
  const { id } = req.params;

  if( !isUuid(id) ) {
      return res.status(400).json({ error: "Invalid Project Id" })
  }

  return next()
}

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title,url,techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repository)

  return response.json(repository)
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
    const { title,url,techs } = request.body;

    const projectIndex = repositories.findIndex(repository => repository.id === id)

    if(projectIndex < 0) {
        return response.status(400).json( { error: 'project not found' })
    };

    const repository = {
      id: uuid(),
      title,
      url,
      techs,
      likes: 0
    };

    repositories[projectIndex] = repository;

    return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title,url,techs } = request.body;

  if(repositories.findIndex(repository => repository.id === id)){
    return response.status(400).send({message: "No content"})
  }

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.slice(repository,1)

  return response.json(repositories)
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repository = repositories.find(repository => repository.id === id);

  if(repositories.findIndex(repository => repository.id === id)){
    return response.status(400).send({message: "No content"})
  }

  repository.likes += 1

  return response.json(repository)
});

module.exports = app;
