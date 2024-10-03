'use client'

import { CategoriesType, UserContextType } from "@/utils/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import heart from '../../../public/heart.png'
import Image from "next/image";
import { useUserContext } from "@/utils/contexts";

const Category = () => {
    const [categories, setCategories] = useState<CategoriesType[] | null>(null);
    const { user, setUser } = useUserContext() as UserContextType; 

    useEffect(() => {
        const fetchMealData = async () => {
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
                const data = await response.json();
                console.log('data: ', data.categories);
                setCategories(data.categories);
            } catch (error) {
                console.log(`Darn it. Error: ${error}`);
            }
        };
        fetchMealData();
    }, []);

    const handleSaveCategory = (category: string) => {
        if (user) {
            setUser({
                ...user,
                category
            });
        }
    };

    return (
        <section className="flex flex-col items-center p-10">
            <h2 className="text-xl font-bold">Categories</h2>
            <div>
                {categories && categories.map((item, index) => {
                    return (
                        <div className="flex flex-col md:flex-row items-center" key={index}>
                            <div className="flex flex-col items-center w-full">
                                <div className="my-4 p-2 bg-neutral-300 rounded-xl shadow-xl md:flex-col items-center justify-evenly w-full max-w-[1200px]">
                                    <Link href={`category/chosenCategory/${item.strCategory}`}>
                                        <h3 className="font-bold text-lg text-center py-2 underline">{item.strCategory} &#x2192;</h3>
                                    </Link>
                                    <div className="flex justify-around w-full">
                                        <img className="max-w-1/2" src={item.strCategoryThumb} alt={item.strCategory} />
                                        <div className="rounded-xl p-2 md:w-1/2 max-h-[200px] overflow-auto bg-neutral-100">
                                            <p className="text-sm text-neutral-700">{item.strCategoryDescription}</p>
                                        </div>
                                        <div
                                            className={`SAVE-CATEGORY w-[35px] flex gap-1 md:flex-col items-center justify-center mb-3 -mt-3 md:ml-1 rounded-full`}
                                            onClick={() => handleSaveCategory(item.strCategory)}
                                        >
                                            <Image className={`w-full cursor-pointer rounded-full  ${user?.category === item.strCategory && 'bg-green-300'}`} src={heart} alt="heart" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default Category;
