const fs = require('fs');
const path = require('path');

function stringFirstToUpperCase(str) {
	return str.split('').map((x, i) => !i ? x.toUpperCase() : x).join('');
}

function stringAllToUpperCase(str) {
	return str.split('').map(x => x.toUpperCase()).join('');
}

module.exports = {
  stringFirstToUpperCase,
  stringAllToUpperCase
}
