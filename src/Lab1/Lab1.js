'use strict';

/*
const fs = require('fs');
const dataPath = 'src/Lab1/Data.json';
const inputData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
const countryMatrix = inputData.countries[0].matrix;
*/

const countryMatrix = [
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
];

const COLORS = ['red', 'blue', 'green', 'yellow'];
const randColors = (colors, arr) => arr.map((el) => colors[el]);
const mapFn = () => Math.floor(Math.random() * 4);
const randNumbers = Array.from({ length: countryMatrix.length }, mapFn);
const initState = randColors(COLORS, randNumbers);

const adjConflicts = (matrix, state, currColor, vertex) => {
  let counter = 0;

  for (const i in matrix[vertex]) {
    if (matrix[vertex][i] && currColor === state[i]) counter++;
  }

  return counter;
};

const allConflicts = (matrix, state) => {
  let counter = 0;

  for (let i = 0; i < matrix.length; i++) {
    for (let j = i; j < matrix.length; j++) {
      if (matrix[i][j]) {
        if (state[i] === state[j]) {
          counter++;
        }
      }
    }
  }

  return counter;
};

let iterations = 0;

const hillClimbing = (initState, matrix, colors) => {
  let sideSteps = 0;
  let resConflicts = allConflicts(matrix, initState);
  const result = [...initState];
  let localMinimum = false;

  while (sideSteps !== 100 && resConflicts !== 0 && !localMinimum) {
    iterations++;
    const bindConflicts = adjConflicts.bind(null, matrix, result);
    const saveIndices = (el, i) => ({ value: el, index: i });
    const conflicts = result.map(bindConflicts).map(saveIndices);
    conflicts.sort((a, b) => b.value - a.value);

    localMinimum = true;

    for (const vertex of conflicts) {
      const ownColor = result[vertex.index];
      let found = false;
      let newColor;

      for (const color of colors) {
        if (color !== ownColor) {
          const newConflicts = bindConflicts(color, vertex.index);

          if (newConflicts < vertex.value) {
            result[vertex.index] = color;
            localMinimum = false;
            found = true;
            break;
          } else if (newConflicts === vertex.value) {
            localMinimum = false;
            newColor = color;
          }
        }
      }

      if (found) break;
      result[vertex.index] =
        newColor !== undefined ? newColor : result[vertex.index];
      sideSteps++;
    }

    /*
    const periphery = [];

    for (const i in result) {
      const currColor = result[i];
      const otherColors = colors.filter((c) => c !== currColor);
      for (const color of otherColors) {
        const state = [...result];
        state[i] = color;
        periphery.push(state);
      }
    }

    const heurFn = detConflicts.bind(null, matrix);
    const heuristics = periphery.map(heurFn).sort((a, b) => a - b);
    periphery.sort((a, b) => heurFn(a) - heurFn(b));

    if (heuristics[0] > resConflicts) break;
    result = periphery[0];
    if (heuristics[0] === resConflicts) sideSteps++;
     */

    resConflicts = allConflicts(matrix, result);
  }

  return result;
};

const result = hillClimbing(initState, countryMatrix, COLORS);
console.log(iterations);
console.dir({ initState, result });
console.log(allConflicts(countryMatrix, result));

/*
[
  'yellow',
  'red',
  'red',
  'green',
  'green',
  'red',
  'yellow',
  'green',
  'red',
  'yellow',
  'yellow',
  'yellow',
  'red',
  'blue',
  'yellow',
  'yellow',
  'green',
  'red',
  'blue',
  'green',
  'red',
  'red',
]*/
