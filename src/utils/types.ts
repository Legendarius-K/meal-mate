export type UserType = {
    name: string | null
    category: string
    recipes: string[]
}

export type UserContextType = {
    user: UserType | null,
    setUser: (user: UserType | null) => void
}

export type SavedRecipesContextType = {
    savedRecipes: string[]; // This stores an array of recipe names (strings)
    setSavedRecipes: React.Dispatch<React.SetStateAction<string[]>>; // Function to update saved recipes
};

export interface fetchMealDataType  {
    fetchPath: string
}

export type RecipeType = {
    strMeal: string
    idMeal: string
    strMealThumb: string
    strArea?: string
    strInstructions?: string
}

export type CategoriesType = {
    strCategory: string
    strCategoryThumb: string
    strCategoryDescription: string
}