'use strict';

const Node = require('./Node.js');
const fs = require('fs');
const displayPath = 'src/Lab2/display.txt';
/*
const inputPath = 'src/Lab2/test.dat';
const outputPath = 'src/Lab2/result.dat';

 */

class AVLTree {
  static printTab = 8;
  comparisons = 0;

  constructor() {
    this.root = null;
  }

  getBalance(node) {
    return this.getHeight(node.leftChild) - this.getHeight(node.rightChild);
  }

  getHeight(node) {
    if (node === null) return -1;
    if (node.leftChild === null && node.rightChild === null) return 0;

    return (
      1 +
      Math.max(this.getHeight(node.leftChild), this.getHeight(node.rightChild))
    );
  }

  getValue(key) {
    this.comparisons = 0;
    const node = this.find(key);

    if (node === null) {
      console.log('Cannot find key');
      return false;
    }

    console.log(
      `Node with key ${node.key} found, its value: ${node.value}, number of comparisons: ${this.comparisons}`
    );
    return node.value;
  }

  minChild(node) {
    let curr = node;

    while (curr.leftChild) {
      curr = curr.leftChild;
    }
    return curr;
  }

  maxChild(node) {
    let curr = node;

    while (curr.rightChild) {
      curr = curr.rightChild;
    }
    return curr;
  }

  edit(key, newValue = 'default') {
    const node = this.find(key);

    if (node === null) {
      console.log('No such key in tree');
      return false;
    }

    node.value = newValue;
    return true;
  }

  insert(key, value = 'standard', node = this.root) {
    if (node === null) {
      console.log(`New node inserted successfully: key ${key} value ${value}`);
      return new Node(key, value);
    }

    if (key === node.key) {
      console.log('Cannot insert a duplicate key!');
      return node;
    }

    if (key < node.key) {
      node.leftChild = this.insert(key, value, node.leftChild);
    } else if (key > node.key) {
      node.rightChild = this.insert(key, value, node.rightChild);
    }

    node.balance = this.getBalance(node);
    return this.rebalance(node);
  }

  find(key, node = this.root) {
    this.comparisons++;
    if (key < node?.key) {
      return this.find(key, node.leftChild);
    } else if (key > node?.key) {
      return this.find(key, node.rightChild);
    }

    return node;
  }

  rebalance(node) {
    if (node.balance > 1) {
      if (node.leftChild.balance >= 0) {
        return this.rotateRight(node);
      }

      node.leftChild = this.rotateLeft(node.leftChild);
      return this.rotateRight(node);
    }

    if (node.balance < -1) {
      if (node.rightChild.balance <= 0) {
        return this.rotateLeft(node);
      }

      node.rightChild = this.rotateRight(node.rightChild);
      return this.rotateLeft(node);
    }

    return node;
  }

  rotateRight(parent) {
    const left = parent.leftChild;
    const T2 = left.rightChild;
    left.rightChild = parent;
    parent.leftChild = T2;

    parent.balance = this.getBalance(parent);
    left.balance = this.getBalance(left);

    return left;
  }

  rotateLeft(parent) {
    const right = parent.rightChild;
    const T2 = right.leftChild;
    right.leftChild = parent;
    parent.rightChild = T2;

    parent.balance = this.getBalance(parent);
    right.balance = this.getBalance(right);

    return right;
  }

  delete(key, node = this.root) {
    if (node === null) {
      console.log('Node not found');
      return node;
    }

    if (key < node.key) {
      node.leftChild = this.delete(key, node.leftChild);
    } else if (key > node.key) {
      node.rightChild = this.delete(key, node.rightChild);
    } else if (!node.hasTwoChildren()) {
      if (node.isLeaf()) {
        node = null;
      } else {
        node = node.rightChild !== null ? node.rightChild : node.leftChild;
      }
    } else if (node.balance < 0) {
      const temp = this.minChild(node.rightChild);
      node.key = temp.key;
      node.rightChild = this.delete(temp.key, node.rightChild);
    } else {
      const temp = this.maxChild(node.leftChild);
      node.key = temp.key;
      node.leftChild = this.delete(temp.key, node.leftChild);
    }

    if (node === null) return node;

    node.balance = this.getBalance(node);
    return this.rebalance(node);
  }

  printOut(path = displayPath, node = this.root, space = 0) {
    if (node === null) return;

    space += AVLTree.printTab;

    this.printOut(path, node.rightChild, space);

    fs.appendFileSync(path, '\n');
    for (let i = AVLTree.printTab; i < space; i++) {
      fs.appendFileSync(path, '\t');
    }

    fs.appendFileSync(path, `${node.key}\n`);

    this.printOut(path, node.leftChild, space);
  }

  loadFromFile(path) {
    const data = fs.readFileSync(path, 'utf8');
    const entries = data.split('\n');
    entries.pop();
    const keys = [];
    const values = [];
    for (const e of entries) {
      keys.push(+e.split(':')[0]);
      values.push(e.split(':')[1]);
    }
    for (const i in keys) {
      this.root = this.insert(keys[i], values[i]);
    }
  }

  saveToFile(path, node = this.root) {
    if (node === null) return;

    this.saveToFile(path, node.leftChild);
    fs.appendFileSync(path, `${node.key}:${node.value}\n`);
    this.saveToFile(path, node.rightChild);
  }
}

/*
const tree = new AVLTree();
tree.loadFromFile(inputPath);
fs.writeFileSync(displayPath, '');

 */

/*
tree.getValue(980);
tree.getValue(9004);
tree.getValue(95);
tree.getValue(9698);
tree.getValue(3218);
tree.getValue(3284);
tree.getValue(6239);
tree.getValue(5156);
tree.getValue(4343);
tree.getValue(8885);
tree.getValue(6921);
tree.getValue(4076);
tree.getValue(4436);
tree.getValue(5555);
tree.getValue(7983);

 */
//tree.getValue(7983);
/*
tree.insert(2, 'someValue');
tree.printOut();
tree.saveToFile(outputPath);

 */
module.exports = AVLTree;
