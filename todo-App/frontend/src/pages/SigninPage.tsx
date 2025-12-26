import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { BACKEND_URL } from "../../config"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"


export default function SigninPage() {
    const nevigate = useNavigate();
    const [signinInputs, setSigninInputs] = useState({
        username:'',
        password:''
    })

    async function sentRequest() {
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, signinInputs)
        const data = response.data;
        localStorage.setItem("token", data.token);
        nevigate("/todos")
    }

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>Sign in to continue to your tasks.</CardDescription>
          
        </CardHeader>

        <CardContent>
          <form className="space-y-4">
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
                    setSigninInputs({...signinInputs, username: e.target.value})
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
                onChange={(e)=>{
                    setSigninInputs({...signinInputs, password: e.target.value})
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
            onClick={sentRequest}
          >
            Sign in
          </button>
          <CardAction className="self-center">
            <a href="/signup" className="text-sm font-medium text-orange-600 underline hover:text-orange-700">
              Create account
            </a>
          </CardAction>
        </CardFooter>
      </Card>
    </div>
  )
}