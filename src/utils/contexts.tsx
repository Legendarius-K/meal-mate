'use client'

import { createContext, useContext, useState } from "react";
import { UserContextType, UserType, SavedRecipesContextType } from "./types";

const UserContext = createContext<UserContextType | null>(null)
const SavedRecipesContext = createContext<SavedRecipesContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserType | null>({
        name: "Darius",
        category: "Vegetarian",
        recipes: []
    })

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    return useContext(UserContext)
}

export const SavedRecipesProvider = ({ children }: { children: React.ReactNode }) => {
    // Initialize saved recipes with an empty array
    const [savedRecipes, setSavedRecipes] = useState<string[]>([]);

    return (
        <SavedRecipesContext.Provider value={{ savedRecipes, setSavedRecipes }}>
            {children}
        </SavedRecipesContext.Provider>
    )
}

export const useSavedRecipesContext = () => {
    return useContext(SavedRecipesContext);
}