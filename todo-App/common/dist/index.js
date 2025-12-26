import z from "zod";
export const signupInput = z.object({
    name: z.string(),
    username: z.email(),
    password: z.string().min(6)
});
export const signinInput = z.object({
    username: z.email(),
    password: z.string().min(6)
});
export const createTodoInput = z.object({
    title: z.string(),
    description: z.string()
});
export const updateTodoInput = z.object({
    title: z.string(),
    description: z.string(),
    id: z.string()
});
//# sourceMappingURL=index.js.map