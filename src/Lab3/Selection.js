'use strict';

class Selection {
  constructor(vals, weights) {
    this.items = [];
    for (const i in vals) {
      this.items.push({ index: +i, value: vals[i], weight: weights[i] });
    }
  }

  find(i) {
    return this.items.find((el) => el.index === i);
  }
}

module.exports = Selection;
