'use strict';

class Node {
  constructor(key, value, balance = 0) {
    this.key = key;
    this.value = value;
    this.balance = balance;
    this.leftChild = null;
    this.rightChild = null;
  }

  isLeaf() {
    return this.leftChild === null && this.rightChild === null;
  }

  hasTwoChildren() {
    return this.leftChild !== null && this.rightChild !== null;
  }
}

module.exports = Node;
