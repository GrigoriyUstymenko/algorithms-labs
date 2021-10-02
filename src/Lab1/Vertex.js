'use strict';

class Vertex {
  constructor(index) {
    this.index = index;
    this.neighbors = [];
    this.color = undefined;
  }
}

module.exports = Vertex;
