/*
WEB322- Assignment 02
I declare that this assignment is my own work in accordance
with Seneca's Academic Integrity Policy

Name: Nupur Sharma 
Student ID : 123670242
Date: 08-November-2025

*/ 

const express = require('express');
const path = require('path');
const projectsModule = require('modules/project.js');

const app = express();
const PORT = process.env.PORT || 8080;


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));

projectsModule.initialize().then(() => {

  // Home page
  app.get('/', async (req, res) => {
    const projects = await projectsModule.getAllProjects().catch(() => []);
    // Only show first 3 for cards
    res.render('home', { projects: projects.slice(0, 3) });
  });

  // About page
  app.get('/about', (req, res) => {
    console.log("hello ");
    res.render('about');
  });

  // Projects list 
  app.get('/solutions/projects', async (req, res) => {
    try {
      let projects;
      if (req.query.sector) {
        projects = await projectsModule.getProjectsBySector(req.query.sector);
        if (!projects.length) throw new Error("No projects found for that sector.");
      } else {
        projects = await projectsModule.getAllProjects();
      }
      res.render('projects', { projects });
    } catch (err) {
      res.status(404).render('404', { message: "No projects found for your request." });
    }
  });

  // Project details by ID
  app.get('/solutions/projects/:id', async (req, res) => {
    try {
      const project = await projectsModule.getProjectById(req.params.id);
      if (!project) throw new Error("Project not found.");
      res.render('project', { project });
    } catch (err) {
      res.status(404).render('404', { message: "Sorry, project not found." });
    }
  });

  // 404 page
  app.use((req, res) => {
    res.status(404).render('404', { message: "Sorry, we couldn't find what you are looking for." });
  });

  // Starting 
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
}).catch(err => {
  console.log("Error in initializing ", err);
});

