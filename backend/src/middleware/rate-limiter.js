import rateLimit from "express-rate-limit";

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 5,
  message: "Too many login attempts. Try again in 15 mins.",
});

export const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  message: "Too many registrations. Try again later.",
});

export const quizLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 500, // more generous
  message: "Too many quiz submissions. Try again soon.",
});