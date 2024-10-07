'use client'
import MealCard from "@/components/MealCard";
import { RecipeType } from "@/utils/types";
import { useEffect, useState } from "react";

const ChosenCategory = ({ params }: { params: { slug: string } }) => {
    const {slug} = params;
    const [categoryMeals , setCategoryMeals] = useState<RecipeType[] | null>()

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

    return (
        <section className="p-5">
            <h2 className="text-center text-3xl font-bold">{slug}</h2>
            <div className="flex flex-col items-center md:flex-row justify-center flex-wrap gap-10 p-0 md:p-10">
                {categoryMeals && categoryMeals.map((item, index) => <MealCard key={index} {...item} removeBtn={false} button={true} />)}
            </div>
        </section>
    )
};

export default ChosenCategory
