'use strict';

const fs = require('fs');
const AVLTree = require('./AVLTree.js');
const displayPath = 'src/Lab2/display.txt';
const inputPath = 'src/Lab2/test.dat';
const outputPath = 'src/Lab2/result.dat';

let tree = null;

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const commands = {
  loadFromFile() {
    tree = new AVLTree();
    tree.loadFromFile(inputPath);
    fs.writeFileSync(displayPath, '');
    tree.printOut(displayPath);
  },
  saveToFile() {
    if (tree === null) {
      console.log('Tree empty!');
      return;
    }
    fs.writeFileSync(outputPath, '');
    tree.saveToFile(outputPath);
    fs.writeFileSync(displayPath, '');
    tree.printOut(displayPath);
  },
  insertElement(key, value) {
    tree.root = tree.insert(+key, value);
    fs.writeFileSync(displayPath, '');
    tree.printOut(displayPath);
  },
  deleteElement(key) {
    tree.root = tree.delete(+key);
    fs.writeFileSync(displayPath, '');
    tree.printOut(displayPath);
  },
  editElement(key, newValue) {
    tree.edit(key, newValue);
    fs.writeFileSync(displayPath, '');
    tree.printOut(displayPath);
  },
  findElement(key) {
    tree.getValue(+key);
    fs.writeFileSync(displayPath, '');
    tree.printOut(displayPath);
  },
};

const main = () => {
  console.log(`Available commands:
    loadFromFile
    saveToFile
    insertElement
    deleteElement
    editElement
    findElement`);
  rl.question('Input command name: ', (command) => {
    rl.question('Input arguments: ', (str) => {
      commands[command]
        ? commands[command](...str.split(' '))
        : console.log('No such command');
      main();
    });
  });
};

main();
