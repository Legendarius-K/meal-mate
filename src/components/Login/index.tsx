'use client'
import { useUserContext } from "@/utils/contexts";
import { SetStateAction, useState } from "react";
import { registeredUsers } from "@/utils/user";
import { UserContextType, UserType } from "@/utils/types";

const Login = () => {
    const [userName , setUserName] = useState<string | null>(null)
    const { setUser } = useUserContext() as UserContextType
    const { user } = useUserContext() as UserContextType


    const handleChange = (e: { target: { value: SetStateAction<string | null>; }; }) => {
        setUserName(e.target.value)
    }

    const handleClick = () => {
        const loggedInUser:UserType[] = registeredUsers.filter(user => user.name === userName)
        if (loggedInUser.length) {
            setUser(loggedInUser[0])
            console.log(user);
        }        
    }

    return (
        <div className="flex flex-col gap-4 text-neutral-200 items-center w-4/5 bg-neutral-500 mt-10 py-10 rounded-xl">
            <label className="" htmlFor="login">Enter your username</label>
            <input onChange={handleChange} className="rounded p-1" id="login" placeholder="Username" type="text" />
            <button className="py-2 px-10 bg-neutral-700 shadow-2xl rounded-xl" onClick={handleClick}>Log in</button>
        </div>
    )
};

export default Login
