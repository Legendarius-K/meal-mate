import Link from "next/link";
import { useSavedRecipesContext, useUserContext } from "@/utils/contexts";
import { SavedRecipesContextType, UserContextType } from "@/utils/types";

const Menu = () => {
    const {setUser} = useUserContext() as UserContextType 
    const { setSavedRecipes } = useSavedRecipesContext() as SavedRecipesContextType

    const logOut = () => {
        setUser(null)
        setSavedRecipes([])
    }

    return (
        <nav className="flex justify-around items-center w-full bg-neutral-400 p-2 sticky top-0">
            <Link className="hover:underline" href={"/"} >Home</Link>
            <Link className="hover:underline" href={"/profile"} >Profile</Link>
            <Link className="hover:underline" href={"/category"} >Categories</Link>
            <button onClick={logOut} className="py-1 px-6 bg-neutral-700 text-white rounded-xl hover:bg-neutral-600">Log out</button>
        </nav>
    )
};

export default Menu
