//@ts-nocheck
import { getAllCategories } from "@/requests/category";
import { getAllIngredients } from "@/requests/ingredient";
import { getAllItems } from "@/requests/item";
import { getAllSizes } from "@/requests/size";
import AddItemView from "@/views/item-management/AddItemView";

const getData = async () => {
    const categories = (await getAllCategories())?.data ?? []
    const sizes = (await getAllSizes())?.data ?? []
    const ingredients = (await getAllIngredients())?.data ?? []
    const items = (await getAllItems())?.data ?? []

    return { categories, items, ingredients, sizes }
}

export default async function AddUserPage(){
    const { categories, items, sizes, ingredients } = await getData()

    return <>
        <AddItemView categories={categories} items={items} sizes={sizes} ingredients={ingredients} /> 
    </>
}