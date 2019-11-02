var sha = require("js-sha256");
var qr = require("qrcode");

var hashedValue = sha('Elven Warrior7');
var hashedValue2 = sha('Elven Warrior8');


S
console.log("Value1: " + hashedValue);
console.log("Value2: " + hashedValue2);

var returnedCode;

var currentCode = qr.toFile('./that.png', hashedValue, function(){
  console.log('Success?');
});

var secondCode = qr.toFile('./whatever.png', hashedValue2, function(){
  console.log("second");
});


