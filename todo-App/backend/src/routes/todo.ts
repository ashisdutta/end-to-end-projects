import { Hono } from 'hono'
import { decode, sign, verify } from 'hono/jwt'
import { PrismaClient } from '../../generated/prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import { createTodoInput, signupInput, updateTodoInput } from '@ashisdta/todoapp-common'

export const todoRouter = new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET: string,
    },
    Variables:{
        userId:string
    }
}>();


todoRouter.use("/*", async (c, next)=>{
    const authHeader = c.req.header("authorization") || "";
    const user = await verify(authHeader, c.env.JWT_SECRET) as { id: string } | null;
    console.log("inside middleware")
    try {
        if(user){
        c.set("userId", user.id);
        await next();
    } else{
        c.status(403)
        return c.json({
            message: "You are not logged in"
        })
    }
    } catch {
        c.status(403)
        return c.text("error inside middleware")
    }
})

// create todo
todoRouter.post('/', async(c)=>{
    const prisma = new PrismaClient({
        accelerateUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const { success } = createTodoInput.safeParse(body);
    if(!success){
        c.status(411)
        return c.json({message:"incorrect input"})
    }
    const userId = c.get("userId");
    try{
        const todo = await prisma.todo.create({
        data:{
            title: body.title,
            description: body.description,
            authorId: userId
        }
    })
    return c.json({
        id:todo.id
    })
    }catch{
        c.status(411)
        return c.text("something went wrong")
    }
})

// update Todo
todoRouter.put('/', async(c)=>{
    const prisma = new PrismaClient({
        accelerateUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json();
    const { success } = updateTodoInput.safeParse(body);
    if(!success){
        c.status(411)
        return c.json({message:"incorrect input"})
    }
    const todo = await prisma.todo.update({
        where:{
            id:body.id
        },
        data: {
            title: body.title,
            description: body.description
        }
    })

    return c.json({
        id: todo.id
    })
})

// get todos 
todoRouter.get("/todos", async(c)=>{
    const prisma = new PrismaClient({
        accelerateUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json();

    const todos = await prisma.todo.findMany({
        where:{
            id: body.id
        }
    })
    return c.json(todos)

})

//get todo curresponding to id

todoRouter.get("/:id", async(c)=>{
    const todoId = c.req.param("id");
    const prisma = new PrismaClient({
        accelerateUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const todo = await prisma.todo.findFirst({
            where: {
                id: todoId
            }
        })
        return c.json({
            todo
        })
    } catch (error) {
        c.status(411)
        return c.json({
            message: "error while fetching todo post"
        })
    }
})