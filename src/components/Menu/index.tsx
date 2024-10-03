import Link from "next/link";
import { useUserContext } from "@/utils/contexts";
import { UserContextType } from "@/utils/types";

const Menu = () => {
    const {setUser} = useUserContext() as UserContextType 

    const logOut = () => {
        setUser(null)
    }

    return (
        <nav className="flex justify-around items-center w-full bg-neutral-400 p-2">
            <Link className="hover:underline" href={"/"} >Home</Link>
            <Link className="hover:underline" href={"/profile"} >Profile</Link>
            <Link className="hover:underline" href={"/category"} >Categories</Link>
            <button onClick={logOut} className="py-1 px-10 bg-neutral-700 text-white rounded-xl hover:bg-neutral-600">Log out</button>
        </nav>
    )
};

export default Menu
