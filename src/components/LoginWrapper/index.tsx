'use client'

import { useUserContext } from "@/utils/contexts";
import Login from "../Login";
import React from "react";
import { UserContextType } from "@/utils/types";
import Menu from "../Menu";

const LoginWrapper = ({ children }: { children: React.ReactNode }) => {
    const { user } = useUserContext() as UserContextType

    return (
        <div className="flex justify-center ">
            {!user ? <Login /> : (
                <div className="flex flex-col w-full">
                    <Menu />
                    {/* <p>Hi {user.name}</p> */}
                    {children}
                </div>
            )}
        </div>
    )
};

export default LoginWrapper
