'use strict';

class Population {
  constructor(selection, size, maxWeight) {
    this.maxWeight = maxWeight;
    const people = [];

    for (let i = 0; i < size; i++) {
      const p = new Array(size);
      p.fill(0);
      p[i] = 1;
      people.push(p);
    }

    for (let i = people.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = people[i];
      people[i] = people[j];
      people[j] = temp;
    }

    this.people = people;
    this.selection = selection;
  }

  getVal(i) {
    return this.people[i].reduce(
      (acc, el, i) => acc + el * this.selection.find(i).value,
      0
    );
  }

  getWeight(i) {
    return this.calcWeight(this.people[i]);
  }

  calcWeight(person) {
    return person.reduce(
      (acc, el, i) => acc + el * this.selection.find(i).weight,
      0
    );
  }

  getMaxI() {
    const fn = (max, el, i) => {
      const newVal = this.getVal(i);
      return this.getVal(max) >= newVal ? max : i;
    };
    return this.people.reduce(fn, 0);
  }

  getMinI() {
    const fn = (min, el, i) => {
      const newVal = this.getVal(i);
      return this.getVal(min) <= newVal ? min : i;
    };
    return this.people.reduce(fn, 0);
  }

  get max() {
    return this.people[this.getMaxI()];
  }

  get min() {
    return this.people[this.getMinI()];
  }

  crossbreed(i1, i2, mutationChance, crossP) {
    const half = this.people[i1].slice(0, crossP);
    const newPerson = half.concat(this.people[i2].slice(crossP));
    const mutated = this.mutate(newPerson, mutationChance);
    const improved = this.locImprove(mutated);
    return this.calcWeight(improved) <= this.maxWeight ? improved : null;
  }

  mutate(person, chance) {
    const mutated = person.slice();
    if (Math.random() < chance) {
      const randomI = Math.floor(Math.random() * person.length);
      const curr = mutated[randomI];
      mutated[randomI] = curr === 1 ? 0 : 1;
    }
    return this.calcWeight(mutated) <= this.maxWeight ? mutated : person;
  }

  locImprove(person) {
    const improved = person.slice();
    const notIn = this.selection.items.filter((el) => !person[el.index]);

    const comp = (a, b) => b.value - a.value;
    notIn.sort(comp);

    if (notIn.length === 0) return person;

    improved[notIn[0].index] = 1;
    return this.calcWeight(improved) <= this.maxWeight ? improved : person;
  }

  removeWeakest() {
    this.people.splice(this.getMinI(), 1);
  }
}

module.exports = Population;
