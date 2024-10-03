'use client'

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'; // Import from 'next/navigation' in Next.js 13+
import { useSavedRecipesContext } from "@/utils/contexts";
import { RecipeType, SavedRecipesContextType } from "@/utils/types";

const RecipePage = ({ params }: { params: { id: string } }) => {
    const router = useRouter();
    const { id } = params;
    const [recipe, setRecipe] = useState<RecipeType | null>(null);
    const [ingredientsWithMeasures, setIngredientsWithMeasures] = useState<{ ingredient: string, measure: string }[] | null>(null);
    const { savedRecipes, setSavedRecipes } = useSavedRecipesContext() as SavedRecipesContextType

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                if (id) {
                    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
                    const data = await response.json();
                    setRecipe(data.meals[0]);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchRecipe();
    }, [id]);

    useEffect(() => {
        if (recipe) {
            // Extract ingredient keys and values
            const ingredientKeys = Object.keys(recipe).filter(key => key.startsWith("strIngredient"));
            const ingredientValues = ingredientKeys
                .map(key => recipe[key as keyof RecipeType] as string)
                .filter(value => value && value.trim() !== "");

            // Extract measure keys and values
            const measureKeys = Object.keys(recipe).filter(key => key.startsWith("strMeasure"));
            const measureValues = measureKeys
                .map(key => recipe[key as keyof RecipeType] as string)
                .filter(value => value && value.trim() !== "");

            // Combine ingredients and measures
            const combined = ingredientValues.map((ingredient, index) => ({
                ingredient,
                measure: measureValues[index] || "" // Match measure to ingredient by index, fallback to empty string
            }));

            setIngredientsWithMeasures(combined);
        }
    }, [recipe]); 

    const saveRecipe = (meal: string) => {
        setSavedRecipes((prevRecipes: string[]) => {
            if (prevRecipes.includes(meal)) {
                return prevRecipes;
            }

            return [...prevRecipes, meal];
        });
    };

    return (
        <div>
            {recipe && (
                <div className="flex flex-col items-center px-3 py-10">
                    <h2 className="text-3xl text-center mt-10 mb-3">{recipe.strMeal}</h2>
                    <button className={`py-2 my-3 px-10 bg-neutral-700 text-white text-lg rounded-xl ${savedRecipes.includes(recipe.idMeal) && 'text-green-400'}`} onClick={() => saveRecipe(recipe.idMeal)}>{savedRecipes.includes(recipe.idMeal) ? "Saved!" : "Save Recipe"}</button>

                    <div className="flex flex-col md:flex-row items-center">
                        <img className="rounded-xl w-full md:w-1/2" src={recipe.strMealThumb} alt="meal" />
                        <div className="md:px-5">
                            {recipe && <p className="py-3">{recipe.strInstructions}</p>}
                        </div>
                    </div>
                    {ingredientsWithMeasures && (
                        <div className="py-10">
                            <h3 className="text-xl mt-5">Ingredients and Measures:</h3>
                            <ul>
                                {ingredientsWithMeasures.map((item, index) => (
                                    <li key={index}>
                                        {item.ingredient} - {item.measure}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <button onClick={() => router.back()} className="py-2 px-10 bg-neutral-700 text-white text-lg rounded-xl">Back</button>
                </div>
            )}
        </div>
    );
};

export default RecipePage;
