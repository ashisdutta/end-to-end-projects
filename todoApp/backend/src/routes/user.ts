import { Hono } from 'hono'
import { decode, sign, verify } from 'hono/jwt'
import { PrismaClient } from '../../generated/prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'


export const userRouter = new Hono<{    // whatever env variable you introduce, put then in the bindings so that TS knows this these varible exists.
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET: string,
    }
}>();


userRouter.post("/signup", async (c) => {
    const body = await c.req.json();
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

        const jwt_token = await sign({id:user.id}, c.env.JWT_SECRET)

        return c.json({
            token: jwt_token
        })
    } catch(e){
        c.status(411);
        return c.text("Invalid")
    }
})