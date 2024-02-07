// @ts-ignore

import rateLimit from 'express-rate-limiter';
// const rateLimit = require('express-rate-limiter')

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests allowed within the windowMs
  message: "Too many requests from this IP, please try again later.",
});

export default apiLimiter
