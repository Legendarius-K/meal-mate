'use client'
import Image from "next/image";
import { fetchMealData } from "@/utils/functions";
import { useUserContext } from "@/utils/contexts";
import { UserContextType } from "@/utils/types";
import { useEffect, useState } from "react";


const WelcomeMeal = () => {
    const [meal , setMeal] = useState<string | null>(null)
    
    useEffect(() => {

        const fetchMealData = async () => {
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
                const data = await response.json()
                console.log(data);

            } catch (error) {
                console.log(`Darn it. Error: ${error}`);
            }

        }
        fetchMealData()
    }, [])

    return (
        <section>
            
        </section>
    )
};

export default WelcomeMeal
