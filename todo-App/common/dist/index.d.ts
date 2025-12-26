import z from "zod";
export declare const signupInput: z.ZodObject<{
    name: z.ZodString;
    username: z.ZodEmail;
    password: z.ZodString;
}, z.z.core.$strip>;
export type SignupInput = z.infer<typeof signupInput>;
export declare const signinInput: z.ZodObject<{
    username: z.ZodEmail;
    password: z.ZodString;
}, z.z.core.$strip>;
export type SigninInput = z.infer<typeof signinInput>;
export declare const createTodoInput: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
}, z.z.core.$strip>;
export type CreateTodoInput = z.infer<typeof createTodoInput>;
export declare const updateTodoInput: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    id: z.ZodString;
}, z.z.core.$strip>;
export type UpdateTodoInput = z.infer<typeof updateTodoInput>;
//# sourceMappingURL=index.d.ts.map