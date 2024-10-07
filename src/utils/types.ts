export type UserType = {
    name: string | null
    category: string
    recipes: string[]
}

export type UserContextType = {
    user: UserType | null,
    setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
}

export type SavedRecipesContextType = {
    savedRecipes: string[]; 
    setSavedRecipes: React.Dispatch<React.SetStateAction<string[]>>; 
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

export type MealCardProps = {
    idMeal: string
    strMeal: string
    strMealThumb: string
    button?: boolean
    removeBtn: boolean
}