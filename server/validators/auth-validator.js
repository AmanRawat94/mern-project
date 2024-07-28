const { z } = require("zod");

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be of 3 characters" })
    .max(60, { message: "Email must not be more than 60 characters" }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(6, { message: "Password must be atleast of 6 characters" })
    .max(1024, { message: "Password must not be more than 1024 characters" }),
});

// creating an object schema
const signUpSchema = loginSchema.extend({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be of 3 characters" })
    .max(40, { message: "Name must not be more than 40 characters" }),
});

module.exports = { signUpSchema, loginSchema };
