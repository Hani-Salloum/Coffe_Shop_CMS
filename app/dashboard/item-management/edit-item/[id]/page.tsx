//@ts-nocheck
import { getAllCategories } from "@/requests/category";
import { getAllIngredients } from "@/requests/ingredient";
import { getAllItems, getItemById } from "@/requests/item";
import { getAllSizes } from "@/requests/size";
import AddItemView from "@/views/item-management/AddItemView";
import EditItemView from "@/views/item-management/EditItemView";

interface Props { params: Promise<{ id: string }> }

const getData = async (id: string) => {
    const categories = (await getAllCategories())?.data ?? []
    const sizes = (await getAllSizes())?.data ?? []
    const ingredients = (await getAllIngredients())?.data ?? []
    const items = (await getAllItems())?.data ?? []
    const data = (await getItemById(id))?.data
    // console.log(data)

    return { categories, items, data, sizes, ingredients }
}

export default async function EditItemPage({ params }: Props){
    const { categories, items, data, sizes, ingredients } = await getData((await params).id)

    return <>
        <EditItemView categories={categories} items={items} data={data} sizes={sizes} ingredients={ingredients} /> 
    </>
}