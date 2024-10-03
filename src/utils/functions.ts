import { fetchMealDataType } from "./types"

export const fetchMealData = async ({ fetchPath }:fetchMealDataType) => {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/${fetchPath}`)
        const data = await response.json()
        return data

    } catch (error) {
        console.log(`Darn it. Error: ${error}`);
    }

}

export const fetchSingleMeal = async ({ fetchPath }: fetchMealDataType) => {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/${fetchPath}`)
        const data = await response.json()
        return data

    } catch (error) {
        console.log(`Darn it. Error: ${error}`);
    }

}