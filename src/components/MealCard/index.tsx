'use client'
import { useSavedRecipesContext } from "@/utils/contexts";
import { SavedRecipesContextType } from "@/utils/types";
import Link from "next/link";

type MealCardProps = {
    idMeal: string
    strMeal: string
    strMealThumb: string
    button?: boolean
    removeBtn: boolean
    // savedRecipes: string[]
    // saveRecipe: (meal: string) => void
}

const MealCard = ({ idMeal, strMeal, strMealThumb, button, removeBtn }: MealCardProps) => {
    const { savedRecipes, setSavedRecipes } = useSavedRecipesContext() as SavedRecipesContextType


    const saveRecipe = (meal: string) => {
        setSavedRecipes((prevRecipes: string[]) => {
            if (prevRecipes.includes(meal)) {
                return prevRecipes;
            }

            return [...prevRecipes, meal];
        });
    };

    const removeRecipe = (meal: string) => {
        setSavedRecipes((prevRecipes: string[]) => prevRecipes.filter((recipe) => recipe !== meal));
    };

    return (
        <div className="flex flex-col items-center md:flex-row justify-center flex-wrap gap-10 p-10">

            <div className="flex flex-col w-[250px]">
                <Link className="flex flex-col items-center my-1 font-bold" href={`/recipe/${idMeal}`}> {strMeal} <img className="rounded-lg" src={strMealThumb} alt="meal" height="auto" width="250px" /></Link>

                {button && (
                    <>
                        {removeBtn && <button onClick={() => removeRecipe(idMeal)} className="py-2 px-10 bg-neutral-700 text-white text-lg rounded-xl">Remove Recipe</button>}
                        {!removeBtn && <button className={`py-2 px-10 bg-neutral-700 text-white text-lg rounded-xl ${savedRecipes.includes(idMeal) && 'text-green-400'}`} onClick={() => saveRecipe(idMeal)}>{savedRecipes.includes(idMeal) ? "Saved!" : "Save Recipe"}</button>}
                    </>
                )}

            </div>

        </div>
    )
};

export default MealCard
