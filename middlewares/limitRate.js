const rate = require('express-rate-limit');

const limiterRate = rate({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

module.exports = limiterRate;
