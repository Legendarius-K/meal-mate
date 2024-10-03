'use client'
import Image from "next/image";
import { fetchMealData } from "@/utils/functions";
import { useUserContext } from "@/utils/contexts";
import { RecipeType, UserContextType } from "@/utils/types";
import { SetStateAction, useEffect, useState } from "react";
import glass from '../../../public/glass.png'
import MealCard from "../MealCard";


const WelcomeMeal = () => {
    const [meal, setMeal] = useState<RecipeType[] | null>(null)
    const [input, setInput] = useState<string | null>(null)
    const [searchMeal, setSearchMeal] = useState<string | null>(null)

    useEffect(() => {
        const fetchMealData = async () => {
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchMeal}`)
                const data = await response.json()
                setMeal(data.meals)

                if (!input) {
                    setMeal(null)
                }

            } catch (error) {
                console.log(`Darn it. Error: ${error}`);
            }
        }
        fetchMealData()

    }, [searchMeal])

    const handleChange = (e: { target: { value: SetStateAction<string | null>; }; }) => {
        setInput(e.target.value)
    }

    const handleClick = () => {
        setSearchMeal(input)
    }

    return (
        <section className="my-10 flex flex-col items-center gap-5">
            <h2>Welcome to Meal Mate! Log in to unlock all the features, or search for e recipe below.</h2>
            <label className="text-sm" htmlFor="meal">Search for a meal</label>
            <div className="my-5 flex  justify-center gap-0">
                <input onChange={handleChange} placeholder="Enter meal ..." className="border-2 border-neutral-400 border-l-2 px-2 rounded-l-full" id="meal" type="text" />
                <button onClick={handleClick} className="text-neutral-800 py-2 px-2 bg-neutral-400 shadow-2xl rounded-r-full" ><Image className="w-[25px]" src={glass} alt="glass" /></button>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-10">
                {meal && meal.map((item, index) => <MealCard key={index} {...item} removeBtn={false} button={false} />)}
            </div>
        </section>
    )
};

export default WelcomeMeal
