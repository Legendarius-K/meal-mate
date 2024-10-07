'use client'

import { useUserContext } from "@/utils/contexts";
import Login from "../Login";
import React from "react";
import { UserContextType } from "@/utils/types";
import Menu from "../Menu";
import WelcomeMeal from "../WelcomeMeal";

const LoginWrapper = ({ children }: { children: React.ReactNode }) => {
    const { user } = useUserContext() as UserContextType

    return (
        <div className="flex justify-center ">
            {!user ?
                <div className="w-full flex flex-col items-center">
                    <Login />
                    <WelcomeMeal/>
                </div>
                : (
                    <div className="flex flex-col w-full">
                        <Menu />
                        {children}
                    </div>
                )}
        </div>
    )
};

export default LoginWrapper
