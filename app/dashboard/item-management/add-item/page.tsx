//@ts-nocheck
import { getAllCategories } from "@/requests/category";
import { getAllItems } from "@/requests/item";
import AddItemView from "@/views/item-management/AddItemView";

const getData = async () => {
    const categories = (await getAllCategories())?.data ?? []
    const items = (await getAllItems())?.data ?? []

    return { categories, items }
}

export default async function AddUserPage(){
    const { categories, items } = await getData()

    return <>
        <AddItemView categories={categories} items={items} /> 
    </>
}