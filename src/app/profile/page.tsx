'use client'
import { useUserContext, useSavedRecipesContext } from "@/utils/contexts";
import { UserContextType, SavedRecipesContextType, RecipeType } from "@/utils/types";
import { useEffect, useState } from "react";
import { fetchSingleMeal } from "@/utils/functions";
import Link from "next/link";

const Profile = () => {
    const { user } = useUserContext() as UserContextType;
    const { savedRecipes } = useSavedRecipesContext() as SavedRecipesContextType;
    const { setSavedRecipes } = useSavedRecipesContext() as SavedRecipesContextType

    const [fetchedRecipes, setFetchedRecipes] = useState<RecipeType[] | null>(null); // State to store fetched recipes

    useEffect(() => {
        const fetchSavedRecipes = async () => {
            if (savedRecipes.length > 0) {
                const recipes = await Promise.all(
                    savedRecipes.map(async (item) => {
                        const recipeData = await fetchSingleMeal({ fetchPath: `lookup.php?i=${item}` });
                        return recipeData.meals ? recipeData.meals[0] : null; // Extract meal if found
                    })
                );
                setFetchedRecipes(recipes.filter((recipe) => recipe !== null)); // Filter out null values
            }
        };

        fetchSavedRecipes();
    }, [savedRecipes]);

    const removeRecipe = (meal: string) => {
        setSavedRecipes((prevRecipes: string[]) => prevRecipes.filter((recipe) => recipe !== meal));
    };

    return (
        <section className="p-5">
            {user && <h2 className="text-xl text-center">Hi {user.name}</h2>}
            <h2 className="text-lg text-center">Here are your saved recipes!</h2>

            <div className="flex flex-wrap justify-center items-center gap-10">
                {fetchedRecipes ? (
                    fetchedRecipes.map((recipe, index) => (
                        <div key={index} className="flex flex-col items-center my-10 w-[250px]">
                            <Link href={`/recipe/${recipe.idMeal}`}className=" text-center">
                                <h3 className="text-lg font-bold">{recipe.strMeal}</h3>
                                <img src={recipe.strMealThumb} alt={recipe.strMeal} className="rounded-lg py-1" width="250px" />
                            </Link>
                            <button onClick={() => removeRecipe(recipe.idMeal)} className="py-2 px-10 bg-neutral-700 text-white text-lg rounded-xl">Remove Recipe</button>
                        </div>
                    ))
                ) : (
                    <p>No saved recipes found.</p>
                )}
            </div>
        </section>
    );
};

export default Profile;
