'use client'
import { useUserContext } from "@/utils/contexts";
import { UserContextType } from "@/utils/types";

const Header = () => {

    return (
        <header>
            <h1 className="text-center text-2xl bg-neutral-700 text-neutral-200 p-10">Meal Mate</h1>
        </header>
    )
};

export default Header
