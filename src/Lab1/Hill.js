'use strict';


const fs = require('fs');
const dataPath = 'src/Lab1/Data.json';
const inputData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
const countryMatrix = inputData.countries[1].matrix;
const ColorGraph = require('./ColorGraph.js');

const COLORS = ['red', 'blue', 'green', 'yellow'];

const adjConflicts = (vertex, color = vertex.color) => {
  let counter = 0;

  for (const n of vertex.neighbors) {
    if (n.color === color) counter++;
  }

  vertex.conflicts = counter;
  return counter;
};

const allConflicts = (graph) => {
  let counter = 0;

  for (const v of graph.vertices) {
    for (const n of v.neighbors) {
      if (v.color === n.color) counter++;
    }
  }

  return counter / 2;
};

let iterations = 0;
let sideSteps = 0;

const hillClimbing = (graph, colors) => {
  graph.fillRandom(colors);
  console.log('Initial colors:');
  console.log(graph.colors);
  let localMinimum = false;

  while (allConflicts(graph) !== 0 && !localMinimum) {
    iterations++;
    const conflictSorted = [...graph.vertices].sort(
      (v1, v2) => adjConflicts(v2) - adjConflicts(v1)
    );

    localMinimum = true;
    for (const vertex of conflictSorted) {
      const oldConflicts = adjConflicts(vertex);
      let found = false;
      let newColor;

      for (const color of colors) {
        if (color !== vertex.color) {
          const newConflicts = adjConflicts(vertex, color);

          if (newConflicts <= oldConflicts) {
            newColor = color;
            localMinimum = false;

            if(newConflicts === oldConflicts) continue;

            found = true;
            break;
          }
        }
      }

      const all = allConflicts(graph);
      if (found) {
        vertex.color = newColor;
        break;
      }
      if(newColor !== undefined) {
        vertex.color = newColor;
        sideSteps++;
        if(sideSteps === 100) {
          console.log('Resulting colors:');
          console.log(graph.colors);
          return allConflicts(graph);
        }
      }
    }
  }

  console.log('Resulting colors:');
  console.log(graph.colors);
  return allConflicts(graph);
};

const countryGraph = new ColorGraph(countryMatrix);

console.log('ResConflicts: ' + hillClimbing(countryGraph, COLORS));
console.dir({ iterations, sideSteps });
console.log(
  'Memory used (MB): ' + Math.floor(process.memoryUsage().rss / 1024 / 1024)
);
