'use strict';

const fs = require('fs');
const dataPath = 'src/Lab1/Data.json';
const inputData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
const countryMatrix = inputData.countries[0].matrix;

/*
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

 */

const COLORS = ['red', 'blue', 'green', 'yellow'];
const randColors = (colors, arr) => arr.map((el) => colors[el]);
const mapFn = () => Math.floor(Math.random() * 4);
const randNumbers = Array.from({ length: countryMatrix.length }, mapFn);
const initState = randColors(COLORS, randNumbers);

const detConflicts = (matrix, state) => {
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

const hillClimbing = (initState, matrix, colors) => {
  let sideSteps = 0;
  let resConflicts = detConflicts(matrix, initState);
  let result = initState;

  while (sideSteps !== 5 && resConflicts !== 0) {
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
    resConflicts = heuristics[0];
  }

  return result;
};

const result = hillClimbing(
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
  ],
  countryMatrix,
  COLORS
);
console.log([
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
]);
console.log(initState);
console.log(result);
console.log(detConflicts(countryMatrix, result));
