import { Hono } from 'hono'
import { decode, sign, verify } from 'hono/jwt'
import { PrismaClient } from '../../generated/prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import { signinInput, signupInput } from '@ashisdta/todoapp-common'

export const userRouter = new Hono<{    // whatever env variable you introduce, put then in the bindings so that TS knows this these varible exists.
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET: string,
    }
}>();

userRouter.post("/signup", async (c) => {
    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if(!success){
        c.status(411)
        return c.json({message:"incorrect input"})
    }
    const prisma = new PrismaClient({
        accelerateUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    try {
        const user = await prisma.user.create({
            data: {
                name: body.name,
                username: body.username,
                password: body.password
            }
        })
        console.log(user)

        const payload: { id: string } = { id: user.id }
        const jwt_token = await sign(payload, c.env.JWT_SECRET)

        return c.json({
            token: jwt_token
        })
    } catch (e) {
        console.error(e);
        return c.json({ error: "Signup failed" }, 400);
    }
})

userRouter.post("/signin", async(c)=>{
    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if(!success){
        c.status(411)
        return c.json({message:"incorrect input"})
    }

    const prisma = new PrismaClient({
        accelerateUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{
        const user = await prisma.user.findUnique({
            where:{
                username:body.username,
                password:body.password
            }
        })
        const payload: { id: string } = { id: user.id }
        const jwt_token = await sign(payload, c.env.JWT_SECRET);
        return c.json({
            token: jwt_token
        })
    } catch{
        c.status(403);
        return c.json("user not found")
    }
}) 