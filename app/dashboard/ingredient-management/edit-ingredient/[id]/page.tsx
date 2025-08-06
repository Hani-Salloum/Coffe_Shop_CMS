//@ts-nocheck

import { getIngredientById } from "@/requests/ingredient";
import EditIngredientView from "@/views/ingredient-management/EditIngredientView";

interface Props { params: Promise<{ id: string }> }

const getData = async (id: string) => {
    const data = (await getIngredientById(id))?.data

    return { data }
}

export default async function EditIngredientPage({ params }: Props){
    const { data } = await getData((await params).id)

    return <>
        <EditIngredientView data={data} /> 
    </>
}