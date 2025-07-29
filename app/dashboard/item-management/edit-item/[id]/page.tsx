//@ts-nocheck
import { getAllCategories } from "@/requests/category";
import { getAllItems, getItemById } from "@/requests/item";
import AddItemView from "@/views/item-management/AddItemView";
import EditItemView from "@/views/item-management/EditItemView";

interface Props { params: Promise<{ id: string }> }

const getData = async (id: string) => {
    const categories = (await getAllCategories())?.data ?? []
    const items = (await getAllItems())?.data ?? []
    const data = (await getItemById(id))?.data
    console.log(data)

    return { categories, items, data }
}

export default async function EditItemPage({ params }: Props){
    const { categories, items, data } = await getData((await params).id)

    return <>
        <EditItemView categories={categories} items={items} data={data} /> 
    </>
}