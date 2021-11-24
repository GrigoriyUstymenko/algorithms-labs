'use strict';

const fs = require('fs');

const data0 = fs.readFileSync('src/Lab2/bigStr.dat', 'utf8');
const strings = data0.split('\n');
strings.pop();

const data1 = fs.readFileSync('src/Lab2/bigNum.dat', 'utf8');
const nums = data1.split('\n');
nums.pop();

for (const i in nums) {
  fs.appendFileSync('src/Lab2/bigTest.dat', `${+nums[i]}:${strings[i]}\n`);
}
