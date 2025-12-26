import { useEffect, useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../../../config";

interface TodoCardProps{
    id: string,
    title: string,
    description: string,
    done:boolean
}


export default function TodoCard({id, title, description, done}:TodoCardProps){
    const [isDone, setIsDone] = useState<boolean>(done)

        async function changeDone(e: React.ChangeEvent<HTMLInputElement>){
        const newValue = e.target.checked;
        setIsDone(newValue)
        try {
            await axios.put(`${BACKEND_URL}/api/v1/todo`, {
                id: id,
                done: newValue
            },{
            headers:{
                "authorization": localStorage.getItem("token")
            }} )
        } catch (error) {
            setIsDone(!newValue);
            alert("Update failed!");
        }
    } 

    return <div>
        <div className="justify center">
            <div>
                <input 
                type="checkbox"
                checked={isDone}
                onChange={(e)=>{
                    changeDone(e)
                }}
                />
            </div>
            <div>
                <div className=" justify-center">
                    {title}
                </div>
                <div>
                    {description}
                </div>
            </div>
            
        </div>
    </div>
}