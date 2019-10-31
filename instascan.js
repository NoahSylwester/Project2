var jsqr = require('jsqr');

const code = jsqr('./sample_qr.PNG');

if (code) {
  console.log("Found Code:", code);
}