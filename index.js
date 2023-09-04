const NumberCrypter = require("./NumberCrypter")
const ff = new NumberCrypter();

let a = ff.crypt(2)
console.log(a);
let b = ff.decrypt(a)
console.log(b);
