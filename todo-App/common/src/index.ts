import z from "zod";

export const signupInput = z.object({
    name: z.string(),
    username: z.email(),
    password: z.string().min(6)
})
export type SignupInput = z.infer<typeof signupInput>

export const signinInput = z.object({
    username: z.email(),
    password: z.string().min(6)
})
export type SigninInput = z.infer<typeof signinInput>

export const createTodoInput = z.object({
    title: z.string(),
    description: z.string(),
    authorId: z.string()
})
export type CreateTodoInput = z.infer<typeof createTodoInput>

export const updateTodoInput = z.object({
    title: z.string(),
    description: z.string(),
    id: z.string()
})
export type UpdateTodoInput = z.infer<typeof updateTodoInput>

