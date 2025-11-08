/*
WEB322- Assignment 01
I declare that this assignment is my own work in accordance
with Seneca's Academic Integrity Policy

Name: Nupur Sharma 
Student ID : 123670242
Date: 30-September-2025


*/

const express = require('express');
const path = require('path');
const app = express();
app.set ('view engine' , 'ejs');
const PORT = process.env.PORT || 3000;

// For Vercel deployment
app.set('views', __dirname + '/views');

// Serve static files (CSS, images)
app.use(express.static('public'));

// Load your projects data (from Assignment 1, e.g., from a file or API)
let projects = [];  // Replace with your actual data loading, e.g., fs.readFileSync('data/projects.json')

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/home.ejs'));  // Later change to res.render('home')
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/about.ejs'));
});

app.get('/solutions/projects', (req, res) => {
    const sector = req.query.sector;
    let filteredProjects = projects;
    if (sector) {
        filteredProjects = projects.filter(p => p.sector.toLowerCase() === sector.toLowerCase());
        if (filteredProjects.length === 0) {
            return res.status(404).send('No projects found for this sector');
        }
    }
    res.json(filteredProjects);  // Later change to res.render('projects', { projects: filteredProjects })
});

app.get('/solutions/projects/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const project = projects.find(p => p.id === id);
    if (!project) {
        return res.status(404).send('Project not found');
    }
    res.json(project);  // Later change to res.render('project', { project })
});

// Custom 404 for unmatched routes
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views/404.ejs'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);

});
