// src/pages/SignupPage.tsx
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useState } from "react"
import type { SignupInput } from "@ashisdta/todoapp-common"
import axios from "axios"
import  {BACKEND_URL}  from "../../config"
import { useNavigate } from "react-router-dom"



export default function SignupPage() {
    const navigate = useNavigate();
    const [userInputs, setUserInputs] = useState<SignupInput>({
        name: '',
        username: '',
        password: '',
    });

    async function sendRequest(){
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, userInputs)
        const data = response.data;
        localStorage.setItem("token", data.token);
        navigate("/todos")
    }


    return (    
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
            {JSON.stringify(userInputs)}
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Create your account</CardTitle>
                    <CardDescription>
                        Start tracking your tasks with a quick sign up.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium">
                                Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Jane Doe"
                                className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-primary/60"
                                onChange={(e) => {
                                    setUserInputs({ ...userInputs, name: e.target.value });
                                }}
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="name@email.com"
                                className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-primary/60"
                                onChange={(e)=>{
                                    setUserInputs({ ...userInputs, username: e.target.value})
                                }}
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="********"
                                className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-primary/60"
                                onChange = {(e)=>{
                                    setUserInputs({ ...userInputs, password: e.target.value})
                                }}
                            />
                        </div>
                    </form>
                </CardContent>

                <CardFooter className="flex flex-col gap-3 items-center">
                    <button
                        type="submit"
                        className="w-full rounded-md bg-orange-500 px-4 py-2 font-medium text-white transition hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500/70"
                        style={{ backgroundColor: '#f97316' }}
                        onClick={()=>{
                            sendRequest();
                        }}
                    >
                        Sign up
                    </button>
                    <CardAction className="self-center">
                        <a href="/signin" className="text-sm font-medium text-orange-600 underline hover:text-orange-700">
                            Already have an account? Sign in
                        </a>
                    </CardAction>
                </CardFooter>
            </Card>
        </div>
     )
}