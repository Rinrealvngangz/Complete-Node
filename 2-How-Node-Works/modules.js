// console.log(arguments);
// console.log(require("module").wrapper);

// modules.exports
const C = require("./test-module.1");
const calcul1 = new C();
console.log(calcul1.add(7, 2));

//exports

//const calcul2 = require("./test-module-2");
const { add, multiply, divide } = require("./test-module-2");
console.log(multiply(7, 2));
// caching

require("./test-module-3")();
require("./test-module-3")();
require("./test-module-3")();
