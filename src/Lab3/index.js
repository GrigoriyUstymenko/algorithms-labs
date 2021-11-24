'use strict';

const fs = require('fs');
const Selection = require('./Selection');
const Population = require('./Population');

const POPULATION_SIZE = 100;
const MAX_WEIGHT = 250;
const MUTATION_CHANCE = 0.05;
const CROSS_POINT = 50;

const data0 = fs.readFileSync('src/Lab3/values', 'utf8');
const values = data0.split('\n');
values.pop();

const data1 = fs.readFileSync('src/Lab3/weights', 'utf8');
const weights = data1.split('\n');
weights.pop();

const selection = new Selection(values, weights);

const iterate = (i) => {
  const population = new Population(selection, POPULATION_SIZE, MAX_WEIGHT);
  for (let j = 0; j < i; j++) {
    const maxI = population.getMaxI();

    let randomI = Math.floor(Math.random() * POPULATION_SIZE);
    while (randomI === maxI) {
      randomI = Math.floor(Math.random() * POPULATION_SIZE);
    }
    const newPerson = population.crossbreed(
      maxI,
      randomI,
      MUTATION_CHANCE,
      CROSS_POINT
    );
    if (newPerson !== null) {
      population.people.push(newPerson);
      population.removeWeakest();
    }

    const max = population.getMaxI();
    if (j % 20 === 0) {
      console.log('Iterations: ' + j);
      console.log('Solution weight: ' + population.getWeight(max));
      console.log('Solution value: ' + population.getVal(max));
      console.log('');
    }
  }
  const max = population.getMaxI();
  console.log('Items in the bag: ');
  console.log(population.max);
  console.log('Solution weight: ' + population.getWeight(max));
  console.log('Solution value: ' + population.getVal(max));
};

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.question('Input the number of iterations: ', (i) => {
  iterate(+i);
  rl.close();
});
