'use client'
import { useSavedRecipesContext } from "@/utils/contexts";
import { RecipeType, SavedRecipesContextType } from "@/utils/types";
import Link from "next/link";
import { useEffect, useState } from "react";


const ChosenCategory = ({ params }: { params: { slug: string } }) => {
    const {slug} = params;
    const [categoryMeals , setCategoryMeals] = useState<RecipeType[] | null>()
    const { savedRecipes, setSavedRecipes } = useSavedRecipesContext() as SavedRecipesContextType

    useEffect(() => {

        const fetchMealData = async () => {
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${slug}`)
                const data = await response.json()
                console.log(data);
                setCategoryMeals(data.meals)

            } catch (error) {
                console.log(`Darn it. Error: ${error}`);
            }
        }
        fetchMealData()
    }, [])

    const saveRecipe = (meal: string) => {
        setSavedRecipes((prevRecipes: string[]) => {
            if (prevRecipes.includes(meal)) {
                return prevRecipes;
            }

            return [meal, ...prevRecipes];
        });
    };

    return (
        <section className="p-5">
            <h2 className="text-center text-3xl font-bold">{slug}</h2>
            <div className="flex flex-col items-center md:flex-row justify-center flex-wrap gap-10 p-10">
            {categoryMeals && categoryMeals.map((meal: RecipeType, index) =>
                <div key={index} className="flex flex-col w-[250px]">
                    <Link className="flex flex-col items-center my-1 font-bold" href={`/recipe/${meal.idMeal}`}> {meal.strMeal} <img className="rounded-lg" src={meal.strMealThumb} alt="meal" height="auto" width="250px" /></Link>
                    <button className={`py-2 px-10 bg-neutral-700 text-white text-lg rounded-xl ${savedRecipes.includes(meal.idMeal) && 'text-green-400'}`} onClick={() => saveRecipe(meal.idMeal)}>{savedRecipes.includes(meal.idMeal) ? "Saved!" : "Save Recipe"}</button>
                </div>
            )}
            </div>
        </section>
    )
};

export default ChosenCategory
