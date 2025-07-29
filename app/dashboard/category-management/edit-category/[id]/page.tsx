//@ts-nocheck

import { getCategoryById } from "@/requests/category"
import EditCategoryView from "@/views/category-management/EditCategoryView"

interface EditCategoryPageProps { params: Promise<{ id: string }> }

const getData = async (id: string) => {
    const res = (await getCategoryById(id)).data
    return res
}

export default async function EditCategoryPage({ params }: EditCategoryPageProps){
    const data = await getData((await params).id)

    return <>
        <EditCategoryView data={data} />
    </>
}