const zod = require("zod");

const loginSchema = zod.object({
  email: zod
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Email is require validation by zod" })
    .min(7, { message: "Email must be atleast of 7 chars validation by zod" })
    .max(20, {
      message: "Email must not be more than 20 chars validation by zod",
    }),
  password: zod
    .string()
    .min(1, { message: "Password is required" })
    .min(3, {
      message: "password must be atleast of 3 chars validation by zod",
    })
    .max(10, {
      message: "password must not be more than of 10 chars validation by zod",
    }),
});

//create an object schema
const signUpSchema = loginSchema.extend({
  username: zod
    .string()
    .trim()
    .min(1, { message: "Username is required" })
    .min(3, { message: "Name must be atleast of 3 chars validation by zod" })
    .max(10, {
      message: "Name must not be more than of 10 chars validation by zod",
    }),
  phone: zod
    .string()
    .trim()
    .min(1, { message: "Phone is required" })
    .min(5, { message: "phone must be atleast of 5 chars validation by zod" })
    .max(10, {
      message: "phone must not be more than of 10 chars validation by zod",
    }),
});

module.exports = { signUpSchema, loginSchema };
