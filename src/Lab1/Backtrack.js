'use strict';

const fs = require('fs');
const dataPath = 'src/Lab1/Data.json';
const inputData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
const countryMatrix = inputData.countries[1].matrix;
const ColorGraph = require('./ColorGraph.js');

const COLORS = ['red', 'blue', 'green', 'yellow'];

const detRemaining = (graph, colors, vertex) => {
  let counter = 0;
  for (const color of colors) {
    if (graph.canColor(vertex, color)) {
      counter++;
    }
  }

  return counter;
};

const selectUncolored = (graph, colors) => {
  const detValue = detRemaining.bind(null, graph, colors);
  const MRVsorted = [...graph.uncolored].sort(
    (v1, v2) => (
      (v1.mrv = detValue(v1)), (v2.mrv = detValue(v2)), v1.mrv - v2.mrv
    )
  );
  return MRVsorted[0];
};

let iterations = 0;
let stateCounter = 0;
let deadLocks = 0;

const recBacktrack = (graph, colors, firstIteration = false) => {
  iterations++;
  if (graph.isColored()) return graph.colors;

  const nextVertex = firstIteration
    ? graph.random
    : selectUncolored(graph, colors);

  for (const color of colors) {
    if (graph.canColor(nextVertex, color)) {
      stateCounter++;
      nextVertex.color = color;
      if (recBacktrack(graph, colors)) return graph.colors;
    }
  }
  nextVertex.color = 'none';
  deadLocks++;
  return false;
};

const backtrack = (graph, colors) => {
  graph.fill('none');

  return recBacktrack(graph, colors, true);
};

const countryGraph = new ColorGraph(countryMatrix);
console.log(backtrack(countryGraph, COLORS));
console.dir({ iterations, stateCounter, deadLocks });
