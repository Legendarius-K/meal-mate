'use client'
import MealCard from "@/components/MealCard";
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
                {categoryMeals && categoryMeals.map((item, index) => <MealCard key={index} {...item} removeBtn={false} button={true} />)}
            </div>
        </section>
    )
};

export default ChosenCategory
