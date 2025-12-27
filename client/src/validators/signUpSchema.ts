import z from "zod";

export const signUpSchema = z.object({
  name: z.string(),
  email: z.email("Please enter a valid email address."),
  password: z.string(),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
