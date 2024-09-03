import z from "zod";

export const UserSchema =  z.object({
    name: z.string({ required_error: "Name is required!"}).min(3, "Name must be more than 3 charater!"),
    email: z.string({ required_error: "Email is required!"}).min(3, "Name must be more than 3 charater!")
});