'use client'
import Image from "next/image";
import { fetchMealData } from "@/utils/functions";
import { useUserContext, useSavedRecipesContext } from "@/utils/contexts";
import { RecipeType, UserContextType, SavedRecipesContextType } from "@/utils/types";
import { useEffect, useState } from "react";
import Link from "next/link";
import MealCard from "@/components/MealCard";

export default function Home() {
    const { user } = useUserContext() as UserContextType
    const [recipes, setRecipes] = useState<RecipeType[] | null>(null)

    useEffect(() => {
        const fetchMealData = async () => {
            try {
                if (user) {
                    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${user.category}`)
                    const data = await response.json()
                    setRecipes(data.meals.slice(0, 6))
                }
            } catch (error) {
                console.log(`Darn it. Error: ${error}`);
            }
        }
        fetchMealData()
    }, [])

    return (
        <div className="flex flex-col items-center p-4">
            {user && <h2 className="m-5 text-xl">Welcome {user.name}</h2>}
            <h3>Here are some recipes from your favorite category:</h3>
            <div className="flex flex-col items-center md:flex-row justify-center flex-wrap gap-10 p-10">
                {recipes && recipes?.map((item, index) => <MealCard key={index} {...item} removeBtn={false} button={true}/>)}
            </div>
        </div>
    );
}
