const zod = require("zod");
const contactSchema = zod.object({
  name: zod
    .string()
    .trim()
    .min(1, { message: "Name is required in contact" })
    .min(3, { message: "Name must be atleast 3 chars " })
    .max(10, { message: "Name must not exceeds 10 chars" }),
  email: zod
    .string()
    .min(1, { message: "Email is required in contact" })
    .email({ message: "Invalid email" })
    .trim()
    .min(7, { message: "Email should be 7 chars" })
    .max(50, { message: "Email should not exeed 50 chars" }),
  message: zod
    .string()
    .trim()
    .min(5, { message: "Message is required in contact" })
    .max(500, { message: "Message should not exceeds 500 chars" }),
});

module.exports = contactSchema;
