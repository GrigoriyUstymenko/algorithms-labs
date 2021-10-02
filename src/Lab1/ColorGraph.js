'use strict';

const Vertex = require('./Vertex.js');

class ColorGraph {
  constructor(matrix) {
    this.vertices = [];
    this.matrix = matrix;
    for (const i in matrix) {
      this.vertices.push(new Vertex(i));
    }
    this.link(matrix);
  }

  link(matrix) {
    for (const i in matrix) {
      for (const j in matrix[i]) {
        if (matrix[i][j]) {
          this.getVertex(i).neighbors.push(this.getVertex(j));
        }
      }
    }
  }

  getVertex(index) {
    return this.vertices.find((v) => v.index === index);
  }

  fill(color) {
    for (const v of this.vertices) {
      v.color = color;
    }
  }

  fillRandom(colors) {
    for(const v of this.vertices){
      v.color = colors[Math.floor(Math.random() * colors.length)];
    }
  }

  get colors() {
    const colors = [];
    for (const v of this.vertices) {
      colors.push(v.color);
    }
    return colors;
  }

  isColored() {
    return this.vertices.find((v) => v.color === 'none') === undefined;
  }

  get random() {
    const i = Math.floor(Math.random() * this.vertices.length);
    console.log('Starting with vertex ' + i);
    return this.vertices[i];
  }

  get uncolored() {
    return this.vertices.filter((v) => v.color === 'none');
  }

  canColor(vertex, color) {
    return vertex.neighbors.find((v) => v.color === color) === undefined;
  }
}

module.exports = ColorGraph;
