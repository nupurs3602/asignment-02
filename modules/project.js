const projectData = require("../data/projectData");
const sectorData = require("../data/sectorData");

let projects = [];

// the initialization process 
function initialize() {
  return new Promise((resolve, reject) => {
    try {
      projects = []; // puts the projects array to new array 
      projectData.forEach(project => {
        const sector = sectorData.find(sector => sector.id === project.sector_id);
        const projectWithSector = {
          ...project,
          sector: sector ? sector.sector_name : null // this will set sector but if sector not found put to null
        };
        projects.push(projectWithSector);
      });
      resolve(); 
    } catch (err) {
      reject("Error in initiallizing data:  " + err);
    }
  });
}


function getAllProjects() {
  return new Promise((resolve, reject) => {
    if (projects.length > 0) {
      resolve(projects);
    } else {
      reject("No project data available. was the initiallizze() function called?");
    }
  });
}

// getting a single id by it's id 
function getProjectById(projectId) {
  return new Promise((resolve, reject) => {
    const project = projects.find(project => project.id === projectId);
    if (project) {
      resolve(project);
    } else {
      reject(`ID: ${projectId} not found!`);
    }
  });
}

// getting the project by sector
function getProjectsBySector(sector) {
  return new Promise((resolve, reject) => {
    const searchTerm = sector.toLowerCase();
    const matchedProjects = projects.filter(project => 
      project.sector && project.sector.toLowerCase().includes(searchTerm)
    );

    if (matchedProjects.length > 0) {
      resolve(matchedProjects);
    } else {
      reject(`Unable to find any projects in sector: ${sector}`);
    }
  });
}

module.exports = {
  initialize,
  getAllProjects,
  getProjectById,
  getProjectsBySector
};
